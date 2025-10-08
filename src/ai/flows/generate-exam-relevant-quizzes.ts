'use server';
/**
 * @fileOverview Generates quizzes with exam-relevant questions based on specified chapters or topics.
 *
 * - generateExamRelevantQuizzes - A function that generates exam-relevant quizzes.
 * - GenerateExamRelevantQuizzesInput - The input type for the generateExamRelevantQuizzes function.
 * - GenerateExamRelevantQuizzesOutput - The return type for the generateExamRelevantQuizzes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExamRelevantQuizzesInputSchema = z.object({
  topic: z.string().describe('The specific chapter or topic for which to generate the quiz.'),
  examType: z.string().describe('The type of exam the quiz should be relevant to (e.g., board exam, entrance exam).'),
  numQuestions: z.number().describe('The number of questions to generate for the quiz.'),
});
export type GenerateExamRelevantQuizzesInput = z.infer<typeof GenerateExamRelevantQuizzesInputSchema>;

const GenerateExamRelevantQuizzesOutputSchema = z.object({
  quizQuestions: z.array(
    z.object({
      question: z.string().describe('The text of the quiz question.'),
      options: z.array(z.string()).describe('The possible answer options for the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
      explanation: z.string().describe('An explanation of why the answer is correct.'),
    })
  ).describe('An array of quiz questions with their options and correct answers.'),
});
export type GenerateExamRelevantQuizzesOutput = z.infer<typeof GenerateExamRelevantQuizzesOutputSchema>;

export async function generateExamRelevantQuizzes(input: GenerateExamRelevantQuizzesInput): Promise<GenerateExamRelevantQuizzesOutput> {
  return generateExamRelevantQuizzesFlow(input);
}

const generateExamRelevantQuizzesPrompt = ai.definePrompt({
  name: 'generateExamRelevantQuizzesPrompt',
  input: {schema: GenerateExamRelevantQuizzesInputSchema},
  output: {schema: GenerateExamRelevantQuizzesOutputSchema},
  prompt: `You are an expert educator specializing in creating exam-relevant quizzes.

  Given the topic, exam type, and the number of questions requested, generate a quiz with the specified parameters.
  Each question should have multiple choice options, the correct answer, and an explanation of why the answer is correct.

  Topic: {{{topic}}}
  Exam Type: {{{examType}}}
  Number of Questions: {{{numQuestions}}}

  Ensure that the generated questions are relevant to the specified exam type and cover the key concepts of the topic.
  The output should be a JSON object containing an array of quiz questions, each with the following format:
  {
    "question": "The text of the quiz question",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "The correct answer to the question",
    "explanation": "An explanation of why the answer is correct"
  }
`,
});

const generateExamRelevantQuizzesFlow = ai.defineFlow(
  {
    name: 'generateExamRelevantQuizzesFlow',
    inputSchema: GenerateExamRelevantQuizzesInputSchema,
    outputSchema: GenerateExamRelevantQuizzesOutputSchema,
  },
  async input => {
    const {output} = await generateExamRelevantQuizzesPrompt(input);
    return output!;
  }
);
