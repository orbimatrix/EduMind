'use server';

/**
 * @fileOverview Extracts key examination focus areas from past board papers related to a textbook.
 *
 * - extractKeyTopicsFromPastPapers - A function that retrieves and highlights key examination focus areas from past board papers.
 * - ExtractKeyTopicsFromPastPapersInput - The input type for the extractKeyTopicsFromPastPapers function.
 * - ExtractKeyTopicsFromPastPapersOutput - The return type for the extractKeyTopicsFromPastPapers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeyTopicsFromPastPapersInputSchema = z.object({
  textbookContent: z
    .string()
    .describe('The content of the textbook to extract key topics from.'),
  pastPapersQuery: z
    .string()
    .describe(
      'A query to use when searching for past papers related to the textbook content.'
    ),
});
export type ExtractKeyTopicsFromPastPapersInput = z.infer<
  typeof ExtractKeyTopicsFromPastPapersInputSchema
>;

const ExtractKeyTopicsFromPastPapersOutputSchema = z.object({
  keyTopics:
    z.string()
    .describe(
      'The key examination focus areas extracted from past board papers.'
    ),
});
export type ExtractKeyTopicsFromPastPapersOutput = z.infer<
  typeof ExtractKeyTopicsFromPastPapersOutputSchema
>;

export async function extractKeyTopicsFromPastPapers(
  input: ExtractKeyTopicsFromPastPapersInput
): Promise<ExtractKeyTopicsFromPastPapersOutput> {
  return extractKeyTopicsFromPastPapersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKeyTopicsFromPastPapersPrompt',
  input: {schema: ExtractKeyTopicsFromPastPapersInputSchema},
  output: {schema: ExtractKeyTopicsFromPastPapersOutputSchema},
  prompt: `You are an expert educational assistant. Your task is to extract key examination focus areas from past board papers related to a given textbook content.

  Textbook Content: {{{textbookContent}}}

  Based on the textbook content and the following search query for past papers: {{{pastPapersQuery}}}, identify and highlight the key topics that are most relevant for examination preparation.
  Focus on topics that appear frequently in past papers and are central to the textbook content.
  
  Key Topics:`
});

const extractKeyTopicsFromPastPapersFlow = ai.defineFlow(
  {
    name: 'extractKeyTopicsFromPastPapersFlow',
    inputSchema: ExtractKeyTopicsFromPastPapersInputSchema,
    outputSchema: ExtractKeyTopicsFromPastPapersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
