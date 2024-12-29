# **RAG System for Exam Generation**  
> **An AI-powered platform to create dynamic and adaptive exams from educational content**

## **🚀 Project Overview**  
The **RAG System for Exam Generation** is a state-of-the-art platform designed to simplify the process of creating and managing exams. By leveraging **Retrieval-Augmented Generation (RAG)**, the system retrieves relevant course content and uses advanced NLP techniques to generate questions dynamically. The project also includes features like automated grading and a user-friendly interface, ensuring a seamless experience for both educators and students.  

---

## **📂 Features**  
- **Knowledge Base Construction**:  
  Curated and structured database of course materials, including lecture notes, textbooks, and multimedia.  

- **Document Retrieval & Preprocessing**:  
  Efficient retrieval mechanisms and data preprocessing to extract relevant information.  

- **Dynamic Question Generation**:  
  AI-powered generation of multiple-choice and open-ended questions with customizable difficulty levels.  

- **Automated Answer Verification & Grading**:  
  Instant evaluation of responses with intelligent grading algorithms.  

- **Interactive User Interface**:  
  Built with **Next.js**, the platform offers a sleek, responsive interface for taking exams and receiving feedback.

---

## **🛠️ Tech Stack**  
### **Frontend**  
- **[Next.js](https://nextjs.org/)**: For creating a modern, responsive user interface.  

### **Backend**  
- **Python**: Core language for retrieval, question generation, and grading logic.  
- **FastAPI/Flask**: For building APIs to connect the front end with backend services.  

### **AI & NLP Tools**  
- **Hugging Face Transformers**: For leveraging models like T5 and GPT for question generation.  
- **Elasticsearch**: For efficient document retrieval.  
- **Sentence-BERT**: For semantic similarity in answer grading.  

### **Database**  
- **PostgreSQL**: To store and manage structured data.  

---

## **📚 Project Structure**  
```
RAG-System-Exam-Generation/
├── frontend/            # Next.js frontend code  
├── backend/             # APIs, NLP pipelines, and grading logic  
├── data/                # Knowledge base data (lecture notes, textbooks, etc.)  
├── models/              # Pre-trained and fine-tuned NLP models  
├── scripts/             # Utility scripts for data preprocessing and testing  
└── README.md            # Project documentation  
```

---

## **🌟 How It Works**  
1. **Knowledge Base Construction**:  
   Upload structured course materials into the system.  

2. **Document Retrieval**:  
   The RAG system retrieves relevant content using semantic search.  

3. **Question Generation**:  
   AI models generate exam questions tailored to the retrieved content.  

4. **Answer Verification & Grading**:  
   Student responses are automatically graded based on predefined algorithms.  

5. **User Interaction**:  
   Students access exams via a user-friendly interface and receive instant feedback.  

---

## **🤝 Team Members**  
- **Nourdin**: Knowledge Base Construction  
- **Nordin & Youssef**: Document Retrieval & Preprocessing  
- **Youssef**: NLP for Question Generation  
- **Abdelfattah Bouhlali**: Answer Verification, Grading, and User Interface  

---

## **🚧 Current Status**  
- [ ] Knowledge base construction  
- [ ] Document retrieval and preprocessing  
- [ ] Question generation  
- [ ] Answer verification and grading  
- [ ] User interface  

---

## **💻 Installation & Setup**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/<your-username>/RAG-System-Exam-Generation.git
   cd RAG-System-Exam-Generation
   ```  
2. Install backend dependencies:  
   ```bash
   pip install -r backend/requirements.txt
   ```  
3. Run the backend server:  
   ```bash
   python backend/app.py
   ```  
4. Start the Next.js frontend:  
   ```bash
   cd frontend  
   npm install  
   npm run dev  
   ```  
5. Access the platform at `http://localhost:3000`.

---

## **🎯 Future Plans**  
- Expand question types (e.g., drag-and-drop, matching).  
- Add support for adaptive exams based on student performance.  
- Implement multilingual support for diverse educational contexts.  

---

## **📜 License**  
This project is licensed under the MIT License. See the `LICENSE` file for details.  
