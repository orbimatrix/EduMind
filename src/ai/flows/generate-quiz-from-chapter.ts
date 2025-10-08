'use server';
/**
 * @fileOverview Generates a quiz from a specific chapter or topic of a textbook.
 *
 * - generateQuizFromChapter - A function that generates a quiz from a chapter.
 * - GenerateQuizFromChapterInput - The input type for the generateQuizFromChapter function.
 * - GenerateQuizFromChapterOutput - The return type for the generateQuizFromChapter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizFromChapterInputSchema = z.object({
  chapterContent: z.string().describe('The content of the chapter to generate the quiz from.'),
  examType: z.string().describe('The type of exam the quiz should be relevant to (e.g., board exam, entrance exam).'),
  numQuestions: z.number().describe('The number of questions to generate for the quiz.'),
});
export type GenerateQuizFromChapterInput = z.infer<typeof GenerateQuizFromChapterInputSchema>;

const GenerateQuizFromChapterOutputSchema = z.object({
  quizQuestions: z.array(
    z.object({
      question: z.string().describe('The text of the quiz question.'),
      options: z.array(z.string()).describe('The possible answer options for the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
      explanation: z.string().describe('An explanation of why the answer is correct.'),
    })
  ).describe('An array of quiz questions with their options and correct answers.'),
});
export type GenerateQuizFromChapterOutput = z.infer<typeof GenerateQuizFromChapterOutputSchema>;

export async function generateQuizFromChapter(input: GenerateQuizFromChapterInput): Promise<GenerateQuizFromChapterOutput> {
  return generateQuizFromChapterFlow(input);
}

const generateQuizFromChapterPrompt = ai.definePrompt({
  name: 'generateQuizFromChapterPrompt',
  input: {schema: GenerateQuizFromChapterInputSchema},
  output: {schema: GenerateQuizFromChapterOutputSchema},
  prompt: `You are an expert educator specializing in creating exam-relevant quizzes based on textbook chapters.

  Given the chapter content, exam type, and the number of questions requested, generate a quiz with the specified parameters.
  Each question should have multiple-choice options, the correct answer, and an explanation of why the answer is correct.

  Chapter Content: {{{chapterContent}}}
  Exam Type: {{{examType}}}
  Number of Questions: {{{numQuestions}}}

  Ensure that the generated questions are relevant to the specified exam type and cover the key concepts of the chapter.
  The output should be a JSON object containing an array of quiz questions, each with the following format:
  {
    "question": "The text of the quiz question",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "The correct answer to the question",
    "explanation": "An explanation of why the answer is correct"
  }
`,
});

const generateQuizFromChapterFlow = ai.defineFlow(
  {
    name: 'generateQuizFromChapterFlow',
    inputSchema: GenerateQuizFromChapterInputSchema,
    outputSchema: GenerateQuizFromChapterOutputSchema,
  },
  async input => {
    const {output} = await generateQuizFromChapterPrompt(input);
    return output!;
  }
);
