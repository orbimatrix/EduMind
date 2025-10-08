'use server';
/**
 * @fileOverview This flow augments learning materials with web research by analyzing educational forums, past exam papers, and real-world applications.
 *
 * - augmentLearningMaterialsWithWebResearch - A function that handles the augmentation of learning materials with web research.
 * - AugmentLearningMaterialsInput - The input type for the augmentLearningMaterialsWithWebResearch function.
 * - AugmentLearningMaterialsOutput - The return type for the augmentLearningMaterialsWithWebResearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AugmentLearningMaterialsInputSchema = z.object({
  topic: z.string().describe('The topic for which to augment learning materials.'),
});
export type AugmentLearningMaterialsInput = z.infer<typeof AugmentLearningMaterialsInputSchema>;

const AugmentLearningMaterialsOutputSchema = z.object({
  augmentedContent: z.string().describe('Augmented learning materials with web research findings, including difficulty assessments.'),
});
export type AugmentLearningMaterialsOutput = z.infer<typeof AugmentLearningMaterialsOutputSchema>;

export async function augmentLearningMaterialsWithWebResearch(
  input: AugmentLearningMaterialsInput
): Promise<AugmentLearningMaterialsOutput> {
  return augmentLearningMaterialsWithWebResearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'augmentLearningMaterialsPrompt',
  input: {schema: AugmentLearningMaterialsInputSchema},
  output: {schema: AugmentLearningMaterialsOutputSchema},
  prompt: `You are an AI assistant designed to augment learning materials with web research.

  Analyze educational forums, past exam papers, and real-world applications to provide comprehensive learning resources for the given topic. Also, integrate difficulty assessments from educational forums.

  Topic: {{{topic}}}

  Provide the augmented learning materials, including difficulty assessments:
  `,
});

const augmentLearningMaterialsWithWebResearchFlow = ai.defineFlow(
  {
    name: 'augmentLearningMaterialsWithWebResearchFlow',
    inputSchema: AugmentLearningMaterialsInputSchema,
    outputSchema: AugmentLearningMaterialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
