from fastapi import APIRouter, HTTPException
from app.schemas.request import QuestionRequest
from app.schemas.response import QuestionResponse
from app.services.piepeline import exam_pipeline
from langchain_ollama import OllamaLLM
from app.utils.faiss_utils import load_faiss_index
import json
import re

router = APIRouter()

import os

base_dir = os.path.dirname(os.path.abspath(__file__))  # Current script directory
vectorstore_path = os.path.join(base_dir, "vector_database")

# Load the FAISS vector database
faiss_index = load_faiss_index(vectorstore_path)
ollama_model = OllamaLLM(model="llama3.2")

@router.post("/generate-exam", response_model=QuestionResponse)
async def generate_exam(request: QuestionRequest):
    try:
        exam = exam_pipeline(
            query=request.query,
            question_type=request.question_type,
            question_nbr=request.question_nbr,
            faiss_index=faiss_index,
            ollama_model=ollama_model,
            difficulty=request.difficulty,
            k=25,  # Retrieved documents
            top_n=5  # Re-ranked documents
        )

        # Nettoyer les données de la question pour s'assurer qu'elles sont valides
        for question in exam["questions"]:
            question_data = question.get("question_data")
            if question_data:
                # Essayer d'extraire le JSON
                match = re.search(r'```json\s*(\{.*\})\s*```', question_data, re.DOTALL)
                
                if match:
                    cleaned_data = match.group(1)  # Extraire la partie JSON
                    try:
                        # Tenter de parser la chaîne JSON nettoyée
                        cleaned_data_obj = json.loads(cleaned_data)
                        question["question_data"] = cleaned_data_obj
                    except json.JSONDecodeError:
                        # Si l'analyse échoue, créer un message d'erreur
                        question["question_data"] = None
                        print(f"Failed to parse cleaned question_data for question: {question}")
                else:
                    # Si aucun JSON valide n'est trouvé, définir un message d'erreur
                    question["question_data"] = None
                    print(f"Invalid or missing JSON in question_data for question: {question}")

        return {"questions": exam["questions"]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
