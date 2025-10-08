'use server';
/**
 * @fileOverview Generates structured notes from academic or technical text.
 *
 * - generateNotes - A function that handles note generation.
 * - GenerateNotesInput - The input type for the generateNotes function.
 * - GenerateNotesOutput - The return type for the generateNotes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateNotesInputSchema = z.object({
  sourceContent: z
    .string()
    .describe('The academic or technical text to be converted into notes.'),
  detailLevel: z
    .enum(['concise', 'detailed', 'comprehensive'])
    .describe('The desired level of detail for the notes.'),
});
export type GenerateNotesInput = z.infer<typeof GenerateNotesInputSchema>;

export const GenerateNotesOutputSchema = z.object({
  notes: z
    .string()
    .describe(
      'The generated notes in a hierarchical Markdown format, including summaries, key concepts, and definitions.'
    ),
});
export type GenerateNotesOutput = z.infer<typeof GenerateNotesOutputSchema>;

export async function generateNotes(
  input: GenerateNotesInput
): Promise<GenerateNotesOutput> {
  return generateNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotesPrompt',
  input: { schema: GenerateNotesInputSchema },
  output: { schema: GenerateNotesOutputSchema },
  prompt: `You are an expert at creating structured, hierarchical notes from academic and technical texts. Analyze the provided source material and generate clear, easily digestible notes.

  Source Material:
  '''
  {{{sourceContent}}}
  '''

  Desired Detail Level: {{{detailLevel}}}

  Your task is to generate notes in Markdown format with the following structure:
  1.  **Main Title**: A clear main title for the notes.
  2.  **Hierarchical Outline**: Use Markdown headings (#, ##, ###) to create a logical structure.
  3.  **Key Concepts**: Identify and highlight key concepts. You can use **bold** or *italics*.
  4.  **Bullet Points**: Use bullet points for summaries, learning objectives, critical insights, and main arguments.
  5.  **Definitions**: Clearly define important terminology within the notes.

  Adapt the level of detail based on the user's request (concise, detailed, comprehensive). The output should be a single Markdown string.
  `,
});

const generateNotesFlow = ai.defineFlow(
  {
    name: 'generateNotesFlow',
    inputSchema: GenerateNotesInputSchema,
    outputSchema: GenerateNotesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
