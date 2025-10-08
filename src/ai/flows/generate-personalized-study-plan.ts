'use server';

/**
 * @fileOverview Generates a personalized 2-week study plan based on textbook content and exam patterns.
 *
 * - generatePersonalizedStudyPlan - A function that generates a personalized study plan.
 * - GeneratePersonalizedStudyPlanInput - The input type for the generatePersonalizedStudyPlan function.
 * - GeneratePersonalizedStudyPlanOutput - The return type for the generatePersonalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedStudyPlanInputSchema = z.object({
  bookText: z.string().describe('The complete text of the textbook.'),
  examPatterns: z.string().optional().describe('Information about relevant exam patterns.'),
  availableTime: z.string().optional().describe('The amount of time the student has available to study (e.g., "2 hours per day").'),
});
export type GeneratePersonalizedStudyPlanInput = z.infer<typeof GeneratePersonalizedStudyPlanInputSchema>;

const GeneratePersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized 2-week study plan.'),
});
export type GeneratePersonalizedStudyPlanOutput = z.infer<typeof GeneratePersonalizedStudyPlanOutputSchema>;

export async function generatePersonalizedStudyPlan(input: GeneratePersonalizedStudyPlanInput): Promise<GeneratePersonalizedStudyPlanOutput> {
  return generatePersonalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedStudyPlanPrompt',
  input: {schema: GeneratePersonalizedStudyPlanInputSchema},
  output: {schema: GeneratePersonalizedStudyPlanOutputSchema},
  prompt: `You are an AI study assistant that generates personalized 2-week study plans for students based on their textbooks and exam patterns.

  Here is the textbook content:
  {{bookText}}

  {% if examPatterns %}
  Here are the relevant exam patterns:
  {{examPatterns}}
  {% endif %}

  {% if availableTime %}
  The student has the following amount of time available to study:
  {{availableTime}}
  {% endif %}

  Generate a detailed 2-week study plan that prioritizes topics based on exam patterns and the student's available time.
  The study plan should include specific chapters or sections to read, practice questions to solve, and past papers to review.
  Format the study plan as a series of tasks with clear timelines.
  The plan should be realistic and take into account the volume of work that can reasonably be done within 2 weeks.
  Be specific about the source of study material such as textbook name or specific website to use.
  The output should be well formatted and easily readable.
  `,
});

const generatePersonalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedStudyPlanFlow',
    inputSchema: GeneratePersonalizedStudyPlanInputSchema,
    outputSchema: GeneratePersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
