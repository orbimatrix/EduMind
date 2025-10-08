
'use server';
/**
 * @fileOverview Generates an adaptive math problem for students in Grades 6-8.
 *
 * - generateAdaptiveMathProblem - A function that handles the problem generation.
 * - GenerateAdaptiveMathProblemInput - The input type for the function.
 * - GenerateAdaptiveMathProblemOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateAdaptiveMathProblemInputSchema = z.object({
  skill: z
    .enum(['fractions_decimals', 'algebra', 'geometry'])
    .describe('The core mathematical skill to focus on.'),
  difficulty: z
    .number()
    .min(1)
    .max(5)
    .describe('The target difficulty level for the problem (1-5).'),
  studentAbility: z
    .number()
    .min(0)
    .max(1)
    .describe('An estimated student ability score (0-1).'),
  solveHistory: z
    .array(
      z.object({
        problem: z.string(),
        isCorrect: z.boolean(),
        timeTaken: z.number(),
      })
    )
    .describe('A history of recently solved problems.'),
});
export type GenerateAdaptiveMathProblemInput = z.infer<
  typeof GenerateAdaptiveMathProblemInputSchema
>;

const GenerateAdaptiveMathProblemOutputSchema = z.object({
  problemStatement: z
    .string()
    .describe('The generated math problem, presented clearly.'),
  problemType: z
    .string()
    .describe('The specific sub-skill being tested (e.g., fraction_operations).'),
  expectedAnswer: z
    .string()
    .describe('The correct answer to the problem.'),
  hint: z
    .string()
    .describe('A hint to guide the student if they are stuck.'),
  commonMistake: z
    .string()
    .describe('A common mistake students make on this type of problem.'),
});
export type GenerateAdaptiveMathProblemOutput = z.infer<
  typeof GenerateAdaptiveMathProblemOutputSchema
>;

export async function generateAdaptiveMathProblem(
  input: GenerateAdaptiveMathProblemInput
): Promise<GenerateAdaptiveMathProblemOutput> {
  return generateAdaptiveMathProblemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdaptiveMathProblemPrompt',
  input: { schema: GenerateAdaptiveMathProblemInputSchema },
  output: { schema: GenerateAdaptiveMathProblemOutputSchema },
  prompt: `You are an expert math curriculum designer for students in grades 6-8. Your task is to generate a single, well-formed math problem that is adapted to the student's learning profile.

  **Student Profile:**
  - **Skill Focus:** {{{skill}}}
  - **Target Difficulty:** Level {{{difficulty}}} out of 5
  - **Estimated Ability Score:** {{{studentAbility}}} (A score from 0 to 1, where 1 is high ability)
  - **Recent History:**
    {{#if solveHistory.length}}
      {{#each solveHistory}}
      - Problem: "{{this.problem}}", Correct: {{this.isCorrect}}, Time: {{this.timeTaken}}s
      {{/each}}
    {{else}}
      No recent history.
    {{/if}}

  **Problem Generation Rules:**
  1.  **Target the Skill:** The problem must directly test the specified 'skill'.
        - 'fractions_decimals': Problems involving operations, conversions, or comparisons.
        - 'algebra': Problems involving basic equations, variable manipulation, or solving for a variable.
        - 'geometry': Problems involving transformations (translations, rotations, reflections) on a coordinate plane.
  2.  **Adjust Difficulty:** The problem's complexity should match the 'difficulty' level. Level 1 should be straightforward, while Level 5 should require multiple steps or more abstract reasoning.
  3.  **Personalize:** Use the 'studentAbility' and 'solveHistory' to subtly personalize the problem. If the student is struggling, generate a slightly easier problem to build confidence. If they are excelling, introduce a minor twist.
  4.  **Enrich with Context:** Where appropriate, frame the problem as a simple word problem to make it more engaging.
  5.  **Provide Metadata:** Generate a correct 'expectedAnswer', a helpful 'hint', and a 'commonMistake' to aid in the learning feedback loop. The problem statement should not contain the answer.

  **Example (for skill: 'algebra', difficulty: 2):**
  - **problemStatement:** "If 3x + 5 = 14, what is the value of x?"
  - **expectedAnswer:** "x = 3"
  - **hint:** "To find x, first try to isolate the term with 'x' by subtracting 5 from both sides of the equation."
  - **commonMistake:** "Forgetting to perform the same operation on both sides of the equation."
  - **problemType:** "basic_equations"
  
  Generate the next problem based on the student's profile.
  `,
});

const generateAdaptiveMathProblemFlow = ai.defineFlow(
  {
    name: 'generateAdaptiveMathProblemFlow',
    inputSchema: GenerateAdaptiveMathProblemInputSchema,
    outputSchema: GenerateAdaptiveMathProblemOutputSchema,
  },
  async (input) => {
    try {
        const { output } = await prompt(input);
        return output!;
    } catch (error) {
        console.error("AI problem generation failed, returning fallback.", error);
        // Fallback to a pre-existing problem if AI fails
        const fallbackProblem: GenerateAdaptiveMathProblemOutput = {
            problemStatement: "A rectangle has a length of 12 units and a width of 5 units. What is its area?",
            problemType: "geometry_area",
            expectedAnswer: "60",
            hint: "The area of a rectangle is calculated by multiplying its length by its width.",
            commonMistake: "A common mistake is adding the length and width instead of multiplying them."
        };
        return fallbackProblem;
    }
  }
);
