'use server';
/**
 * @fileOverview Generates a single daily quiz question for a specific subject.
 *
 * - generateDailyQuizQuestion - A function that handles the quiz question generation.
 * - GenerateDailyQuizQuestionInput - The input type for the function.
 * - GenerateDailyQuizQuestionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateDailyQuizQuestionInputSchema = z.object({
  subject: z.string().describe('The subject for the quiz question (e.g., Mathematics, Computer Science, Medical Terminology).'),
});
export type GenerateDailyQuizQuestionInput = z.infer<typeof GenerateDailyQuizQuestionInputSchema>;

const GenerateDailyQuizQuestionOutputSchema = z.object({
  question: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('The possible answer options for the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  explanation: z.string().describe('An explanation of why the answer is correct.'),
});
export type GenerateDailyQuizQuestionOutput = z.infer<typeof GenerateDailyQuizQuestionOutputSchema>;

export async function generateDailyQuizQuestion(
  input: GenerateDailyQuizQuestionInput
): Promise<GenerateDailyQuizQuestionOutput> {
  return generateDailyQuizQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyQuizQuestionPrompt',
  input: { schema: GenerateDailyQuizQuestionInputSchema },
  output: { schema: GenerateDailyQuizQuestionOutputSchema },
  prompt: `You are an expert educator. Your task is to generate a single, engaging multiple-choice quiz question for a daily revision challenge. The question should be relevant for an 8th-grade to first-year university student level.

  Subject: {{{subject}}}

  The question should be clear, concise, and have four plausible options. Provide the question, options, the correct answer, and a brief explanation.

  Generate the quiz question in the specified JSON format.`,
});

const generateDailyQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generateDailyQuizQuestionFlow',
    inputSchema: GenerateDailyQuizQuestionInputSchema,
    outputSchema: GenerateDailyQuizQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
