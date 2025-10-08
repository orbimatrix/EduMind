
'use server';

import { z } from 'zod';
import { generatePersonalizedStudyPlan } from '@/ai/flows/generate-personalized-study-plan';
import { generateExamRelevantQuizzes } from '@/ai/flows/generate-exam-relevant-quizzes';
import { extractKeyTopicsFromPastPapers } from '@/ai/flows/extract-key-topics-from-past-papers';
import { augmentLearningMaterialsWithWebResearch } from '@/ai/flows/augment-learning-materials-with-web-research';
import type { GenerateExamRelevantQuizzesOutput } from '@/ai/flows/generate-exam-relevant-quizzes';
import {
  generateChapterSummary,
  type GenerateChapterSummaryOutput,
} from '@/ai/flows/generate-chapter-summary';

// Schemas for form validation
const studyPlanSchema = z.object({
  bookText: z.string().min(50, 'Textbook content must be at least 50 characters.'),
  examPatterns: z.string().optional(),
  availableTime: z.string().optional(),
});

const quizSchema = z.object({
  topic: z.string().min(3, 'Topic is required and must be at least 3 characters.'),
  examType: z.string().min(3, 'Exam type is required and must be at least 3 characters.'),
  numQuestions: z.coerce.number().min(1, "Please generate at least 1 question.").max(10, "You can generate a maximum of 10 questions at a time."),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
});

const keyTopicsSchema = z.object({
  textbookContent: z.string().min(50, 'Textbook content must be at least 50 characters.'),
  pastPapersQuery: z.string().min(3, 'Past papers query is required and must be at least 3 characters.'),
});

const augmentSchema = z.object({
  topic: z.string().min(3, 'Topic is required and must be at least 3 characters.'),
});

const GenerateChapterSummaryInputSchema = z.object({
  chapterContent: z
    .string().min(1, 'Chapter content is required.'),
  documentType: z
    .enum(['Novel', 'Textbook', 'Research Paper', 'Scientific Journal']),
});


// Types for server action state
type StudyPlanState = {
  message: string;
  errors?: { bookText?: string[]; examPatterns?: string[]; availableTime?: string[] };
  data?: string;
};

type QuizState = {
  message: string;
  errors?: { topic?: string[]; examType?: string[]; numQuestions?: string[]; difficulty?: string[] };
  data?: GenerateExamRelevantQuizzesOutput;
};

type KeyTopicsState = {
  message: string;
  errors?: { textbookContent?: string[]; pastPapersQuery?: string[] };
  data?: string;
};

type AugmentState = {
    message: string;
    errors?: { topic?: string[] };
    data?: string;
}

type ChapterSummaryState = {
  message: string;
  errors?: { chapterContent?: string[], documentType?: string[] };
  data?: GenerateChapterSummaryOutput;
}

// Server Actions
export async function createStudyPlan(prevState: StudyPlanState, formData: FormData): Promise<StudyPlanState> {
  const validatedFields = studyPlanSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await generatePersonalizedStudyPlan(validatedFields.data);
    return { message: 'success', data: result.studyPlan };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating the study plan. Please try again.' };
  }
}


export async function createQuiz(prevState: QuizState, formData: FormData): Promise<QuizState> {
  const validatedFields = quizSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateExamRelevantQuizzes(validatedFields.data);
    return { message: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating the quiz. Please try again.' };
  }
}

export async function createKeyTopics(prevState: KeyTopicsState, formData: FormData): Promise<KeyTopicsState> {
  const validatedFields = keyTopicsSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await extractKeyTopicsFromPastPapers(validatedFields.data);
    return { message: 'success', data: result.keyTopics };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while extracting key topics. Please try again.' };
  }
}

export async function createAugmentedContent(prevState: AugmentState, formData: FormData): Promise<AugmentState> {
  const validatedFields = augmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await augmentLearningMaterialsWithWebResearch(validatedFields.data);
    return { message: 'success', data: result.augmentedContent };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while augmenting content. Please try again.' };
  }
}

export async function createChapterSummary(prevState: ChapterSummaryState, formData: FormData): Promise<ChapterSummaryState> {
  const validatedFields = GenerateChapterSummaryInputSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateChapterSummary(validatedFields.data);
    return { message: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating the summary. Please try again.' };
  }
}
