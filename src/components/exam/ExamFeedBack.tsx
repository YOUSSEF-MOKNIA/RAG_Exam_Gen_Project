import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Stack,
  Badge,
  Button,
  Heading,
  Container,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Icon,
  Flex,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

interface ExamFeedbackProps {
  questions: any[];
  userResponses: { questionId: number; userResponse: string; isCorrect: boolean }[];
  quizData: any;
  score: number;
  userId: number;
  onReset: () => void;
}

const ExamFeedback: React.FC<ExamFeedbackProps> = ({ 
  questions, 
  userResponses, 
  quizData, 
  score, 
  userId, 
  onReset 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Dark mode color values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('teal.600', 'teal.200');
  const correctBg = useColorModeValue('green.50', 'green.900');
  const incorrectBg = useColorModeValue('red.50', 'red.900');
  const questionTextColor = useColorModeValue('gray.700', 'gray.100');
  const explanationColor = useColorModeValue('gray.600', 'gray.400');
  const explanationTextColor = useColorModeValue('gray.700', 'gray.300');

  const handleSaveAndReset = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/quiz/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizData,
          userId,
          score: (score / questions.length) * 100,
          passed: score >= questions.length / 2,
          userAnswers: userResponses,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save quiz');
      }
      onReset();
    } catch (error) {
      console.error('Error saving quiz:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const scorePercentage = Math.round((score / questions.length) * 100);
  const isPassed = score >= questions.length / 2;

  return (
    <Container maxW="container.lg" py={8}>
      <Card 
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
        boxShadow="xl"
      >
        <CardHeader bg={cardBgColor} py={6}>
          <VStack spacing={4}>
            <Heading as="h2" size="lg" color={headingColor}>
              {quizData.title}
            </Heading>
            <Text fontSize="sm" color={textColor}>
              Completed on {formattedDate} at {today.toLocaleTimeString()}
            </Text>
            
            <StatGroup width="full" px={4}>
              <Stat textAlign="center">
                <StatLabel fontSize="md" color={textColor}>Score</StatLabel>
                <StatNumber fontSize="2xl" color={isPassed ? 'green.500' : 'red.500'}>
                  {score}/{questions.length}
                </StatNumber>
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel fontSize="md" color={textColor}>Percentage</StatLabel>
                <StatNumber fontSize="2xl" color={isPassed ? 'green.500' : 'red.500'}>
                  {scorePercentage}%
                </StatNumber>
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel fontSize="md" color={textColor}>Status</StatLabel>
                <StatNumber fontSize="2xl" color={isPassed ? 'green.500' : 'red.500'}>
                  {isPassed ? 'PASSED' : 'FAILED'}
                </StatNumber>
              </Stat>
            </StatGroup>
            
            <Progress
              value={scorePercentage}
              colorScheme={isPassed ? 'green' : 'red'}
              width="full"
              borderRadius="full"
              size="lg"
            />
          </VStack>
        </CardHeader>

        <CardBody>
          <VStack spacing={6}>
            {questions.map((question, index) => {
              const userAnswer = userResponses.find((res) => res.questionId === index + 1);
              const isCorrect = userAnswer?.isCorrect;
              const questionText = question.question_data?.question || 'Question not generated properly';
              const options = question.question_data?.options || [];
              const correctAnswer = options[question.question_data?.correct_answer];

              let userOptionText = "Not Answered";
              if(userAnswer?.userResponse) {
                const optionKeys = Object.keys(options);
                const userOptionIndex = parseInt(userAnswer.userResponse, 10) - 1;
                if (userOptionIndex >= 0 && userOptionIndex < optionKeys.length) {
                  const userOptionKey = optionKeys[userOptionIndex];
                  userOptionText = options[userOptionKey] || "Not Answered";
                }
              }

              return (
                <Box
                  key={index}
                  width="full"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                  bg={isCorrect ? correctBg : incorrectBg}
                  position="relative"
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                >
                  <Flex align="center" mb={4}>
                    <Icon
                      as={isCorrect ? CheckCircleIcon : WarningIcon}
                      w={6}
                      h={6}
                      color={isCorrect ? 'green.500' : 'red.500'}
                      mr={2}
                    />
                    <Heading size="md" color={isCorrect ? 'green.600' : 'red.600'}>
                      Question {index + 1}
                    </Heading>
                  </Flex>

                  <Text fontWeight="medium" mb={4} color={questionTextColor}>
                    {questionText}
                  </Text>

                  <Stack spacing={3}>
                    {options.length > 0 && (
                      <>
                        <Flex align="center">
                          <Badge
                            colorScheme={isCorrect ? 'green' : 'red'}
                            px={2}
                            py={1}
                            borderRadius="full"
                            mr={2}
                          >
                            Your Answer
                          </Badge>
                          <Text color={questionTextColor}>{userOptionText}</Text>
                        </Flex>

                        <Flex align="center">
                          <Badge
                            colorScheme="blue"
                            px={2}
                            py={1}
                            borderRadius="full"
                            mr={2}
                          >
                            Correct Answer
                          </Badge>
                          <Text color={questionTextColor}>{correctAnswer}</Text>
                        </Flex>
                      </>
                    )}

                    <Box mt={2}>
                      <Text fontWeight="medium" color={explanationColor}>
                        Explanation:
                      </Text>
                      <Text color={explanationTextColor}>
                        {question.question_data?.explanation || 'No explanation available'}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </VStack>

          <Flex justify="center" mt={8}>
            <Tooltip label="Save your results and start a new exam" placement="top">
              <Button
                colorScheme="blue"
                size="lg"
                isLoading={isProcessing}
                onClick={handleSaveAndReset}
                loadingText="Saving..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Save and Start New Exam
              </Button>
            </Tooltip>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ExamFeedback;