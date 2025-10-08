'use server';
/**
 * @fileOverview Generates structured flashcards from educational content.
 *
 * - generateFlashcards - A function that handles flashcard generation.
 * - GenerateFlashcardsInput - The input type for the generateFlashcards function.
 * - GenerateFlashcardsOutput - The return type for the generateFlashcards function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  sourceContent: z
    .string()
    .describe('The educational text content to be converted into flashcards.'),
});
export type GenerateFlashcardsInput = z.infer<
  typeof GenerateFlashcardsInputSchema
>;

const FlashcardSchema = z.object({
  term: z.string().describe('The primary concept, keyword, or question.'),
  definition: z
    .string()
    .describe('The detailed explanation, answer, or definition.'),
  difficulty: z
    .number()
    .min(1)
    .max(5)
    .describe('A complexity rating from 1 (easiest) to 5 (hardest).'),
  category: z
    .string()
    .describe('The subject or topic classification for the flashcard.'),
});

const GenerateFlashcardsOutputSchema = z.object({
  flashcards: z
    .array(FlashcardSchema)
    .describe('An array of generated flashcard objects.'),
});
export type GenerateFlashcardsOutput = z.infer<
  typeof GenerateFlashcardsOutputSchema
>;

export async function generateFlashcards(
  input: GenerateFlashcardsInput
): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: { schema: GenerateFlashcardsInputSchema },
  output: { schema: GenerateFlashcardsOutputSchema },
  prompt: `You are an expert in educational content analysis. Your task is to analyze the following source material and generate a set of structured, two-sided flashcards suitable for learning and spaced repetition.

  For each flashcard, provide:
  1.  A 'term' (the key concept or question).
  2.  A 'definition' (a concise but comprehensive explanation).
  3.  A 'difficulty' rating from 1 (very easy) to 5 (very difficult).
  4.  A 'category' that classifies the subject matter.

  Extract the most important concepts from the text and create flashcards that facilitate active recall.

  Source Material:
  '''
  {{{sourceContent}}}
  '''

  Provide the output in the structured JSON format as defined.
  `,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
