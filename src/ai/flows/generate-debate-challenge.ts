'use server';
/**
 * @fileOverview Generates a counter-argument for a debate.
 *
 * - generateDebateChallenge - A function that handles generating a debate counter-argument.
 * - GenerateDebateChallengeInput - The input type for the function.
 * - GenerateDebateChallengeOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateDebateChallengeInputSchema = z.object({
  topic: z.string().describe('The topic of the debate.'),
  userArgument: z.string().describe("The user's argument or opening statement."),
  debateHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the debate so far.'),
});
export type GenerateDebateChallengeInput = z.infer<typeof GenerateDebateChallengeInputSchema>;

export const GenerateDebateChallengeOutputSchema = z.object({
  counterArgument: z.string().describe("The AI's counter-argument."),
});
export type GenerateDebateChallengeOutput = z.infer<typeof GenerateDebateChallengeOutputSchema>;

export async function generateDebateChallenge(
  input: GenerateDebateChallengeInput
): Promise<GenerateDebateChallengeOutput> {
  return generateDebateChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDebateChallengePrompt',
  input: { schema: GenerateDebateChallengeInputSchema },
  output: { schema: GenerateDebateChallengeOutputSchema },
  prompt: `You are an AI debate master. Your role is to challenge the user's arguments on a given topic, forcing them to think critically and defend their position. You must take an opposing or skeptical stance, even if the user's argument is sound.

  Debate Topic: {{{topic}}}
  
  Debate History:
  {{#each debateHistory}}
  **{{role}}**: {{content}}
  {{/each}}

  User's latest argument:
  '''
  {{{userArgument}}}
  '''

  Your task is to generate a concise and challenging counter-argument. Poke holes in their logic, ask for evidence, or introduce an alternative perspective. Your goal is not to "win" but to stimulate a deeper intellectual discussion. Keep your response focused and under 100 words.
  `,
});

const generateDebateChallengeFlow = ai.defineFlow(
  {
    name: 'generateDebateChallengeFlow',
    inputSchema: GenerateDebateChallengeInputSchema,
    outputSchema: GenerateDebateChallengeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
