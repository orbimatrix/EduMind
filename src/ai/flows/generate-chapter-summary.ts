'use server';
/**
 * @fileOverview Generates a structured summary of a chapter from various document types.
 *
 * - generateChapterSummary - A function that handles chapter summarization.
 * - GenerateChapterSummaryInput - The input type for the generateChapterSummary function.
 * - GenerateChapterSummaryOutput - The return type for the generateChapterSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateChapterSummaryInputSchema = z.object({
  chapterContent: z
    .string()
    .describe('The full text content of the chapter to be summarized.'),
  documentType: z
    .enum(['Novel', 'Textbook', 'Research Paper', 'Scientific Journal'])
    .describe('The type of the document the chapter is from.'),
});
export type GenerateChapterSummaryInput = z.infer<
  typeof GenerateChapterSummaryInputSchema
>;

export const GenerateChapterSummaryOutputSchema = z.object({
  bulletPoints: z
    .array(z.string())
    .describe('5-7 concise bullet points capturing the main ideas of the chapter.'),
  keyTerms: z
    .array(z.object({ term: z.string(), definition: z.string() }))
    .describe('3-5 key terms from the chapter with brief definitions.'),
  formulas: z
    .array(z.string())
    .optional()
    .describe('Critical formulas or equations from the chapter (if applicable).'),
  theme: z
    .string()
    .optional()
    .describe('A single sentence describing the overarching theme of the chapter.'),
});
export type GenerateChapterSummaryOutput = z.infer<
  typeof GenerateChapterSummaryOutputSchema
>;

export async function generateChapterSummary(
  input: GenerateChapterSummaryInput
): Promise<GenerateChapterSummaryOutput> {
  return generateChapterSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChapterSummaryPrompt',
  input: {schema: GenerateChapterSummaryInputSchema},
  output: {schema: GenerateChapterSummaryOutputSchema},
  prompt: `You are an expert summarizer. Your task is to analyze the provided chapter content and generate a structured summary. The style of the summary must be adapted to the specified document type.

  Document Type: {{{documentType}}}
  Chapter Content:
  '''
  {{{chapterContent}}}
  '''

  Based on the document type, generate the following:
  1.  **For all types**: 5-7 concise bullet points summarizing the main ideas.
  2.  **For all types**: 3-5 key terms with their definitions.
  3.  **Adaptation for Document Type**:
      -   **Novel**: Focus on plot progression, character development, and thematic elements. The "theme" field is important.
      -   **Textbook/Scientific Journal**: Focus on key concepts, methodologies, critical formulas/equations, and practical applications. The "formulas" field is important if applicable.
      -   **Research Paper**: Highlight research objectives, methodology, key findings, and implications.

  The summary should be objective, concise, and no longer than 250 words in total.

  Provide the output in the structured JSON format as defined.
  `,
});

const generateChapterSummaryFlow = ai.defineFlow(
  {
    name: 'generateChapterSummaryFlow',
    inputSchema: GenerateChapterSummaryInputSchema,
    outputSchema: GenerateChapterSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
