
'use server';

import { z } from 'zod';
import { generatePersonalizedStudyPlan } from '@/ai/flows/generate-personalized-study-plan';
import { generateExamRelevantQuizzes } from '@/ai/flows/generate-exam-relevant-quizzes';
import { extractKeyTopicsFromPastPapers } from '@/ai/flows/extract-key-topics-from-past-papers';
import { augmentLearningMaterialsWithWebResearch } from '@/ai/flows/augment-learning-materials-with-web-research';
import type { GenerateExamRelevantQuizzesOutput } from '@/ai/flows/generate-exam-relevant-quizzes';
import { generateChapterSummary, type GenerateChapterSummaryOutput } from '@/ai/flows/generate-chapter-summary';
import { generateFlashcards, type GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards';
import { generateNotes, type GenerateNotesOutput } from '@/ai/flows/generate-notes';
import { generateDailyQuizQuestion, type GenerateDailyQuizQuestionOutput } from '@/ai/flows/generate-daily-quiz-question';
import { generateAudioFromText } from '@/ai/flows/generate-audio-from-text';
import { ai } from '@/ai/genkit';
import { generateDebateChallenge } from '@/ai/flows/generate-debate-challenge';
import { generateAdaptiveMathProblem, type GenerateAdaptiveMathProblemOutput } from '@/ai/flows/generate-adaptive-math-problem';


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
  errors?: z.ZodError<z.infer<typeof chapterSummarySchema>>['formErrors']['fieldErrors'];
  data?: GenerateChapterSummaryOutput;
}

const chapterSummarySchema = z.object({
  chapterContent: z
    .string().min(1, 'Chapter content is required.'),
  documentType: z
    .enum(['Novel', 'Textbook', 'Research Paper', 'Scientific Journal']),
});


type FlashcardState = {
  message: string;
  errors?: { sourceContent?: string[] };
  data?: GenerateFlashcardsOutput;
}

const flashcardSchema = z.object({
  sourceContent: z.string().min(50, 'Content must be at least 50 characters long.'),
});

type NoteState = {
  message: string;
  errors?: { sourceContent?: string[]; detailLevel?: string[] };
  data?: GenerateNotesOutput;
};

type DailyQuizState = {
  message: string;
  errors?: { subject?: string[] };
  data?: GenerateDailyQuizQuestionOutput;
};

type ChatCompletionState = {
    message: string;
    errors?: { prompt?: string[] };
    data?: {
        text: string;
        audio?: string;
    }
}

type DebateChallengeState = {
    message: string;
    errors?: z.ZodError<any>['formErrors']['fieldErrors'];
    data?: string;
}

type AdaptiveMathState = {
  message: string;
  errors?: z.ZodError<any>['formErrors']['fieldErrors'];
  data?: GenerateAdaptiveMathProblemOutput;
};



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
  const validatedFields = chapterSummarySchema.safeParse(Object.fromEntries(formData.entries()));

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

export async function createFlashcards(prevState: FlashcardState, formData: FormData): Promise<FlashcardState> {
  const validatedFields = flashcardSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateFlashcards(validatedFields.data);
    return { message: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating flashcards. Please try again.' };
  }
}

export async function createNotes(prevState: NoteState, formData: FormData): Promise<NoteState> {
  const noteSchema = z.object({
    sourceContent: z.string().min(50, 'Source content must be at least 50 characters.'),
    detailLevel: z.enum(['concise', 'detailed', 'comprehensive']),
  });

  const validatedFields = noteSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateNotes(validatedFields.data);
    return { message: 'success', data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating notes. Please try again.' };
  }
}

export async function getDailyQuizQuestion(
  input: { subject: string }
): Promise<DailyQuizState> {
  const dailyQuizSchema = z.object({
    subject: z.string(),
  });

  const validatedFields = dailyQuizSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateDailyQuizQuestion(validatedFields.data);
    return { message: 'success', data: result };
  } catch (error) {
    console.error(error);
    // Fallback to a dummy question if AI fails
    const dummyQuestion: GenerateDailyQuizQuestionOutput = {
        question: "What is the term for a fast heart rate?",
        options: ["Bradycardia", "Tachycardia", "Arrythmia", "Hypertension"],
        correctAnswer: "Tachycardia",
        explanation: "Tachycardia is the medical term for a heart rate over 100 beats per minute. Bradycardia is a slow heart rate."
    };
    return { message: 'success', data: dummyQuestion };
  }
}

export async function createChatCompletion(prevState: ChatCompletionState, formData: FormData): Promise<ChatCompletionState> {
    const chatSchema = z.object({
        prompt: z.string().min(1),
        chatHistory: z.string(),
    });

    const validatedFields = chatSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { prompt, chatHistory } = validatedFields.data;
    const parsedHistory = JSON.parse(chatHistory);

    try {
        const history = parsedHistory.map((msg: { text: string, sender: string }) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            content: [{ text: msg.text }],
        }));

        const { text } = await ai.generate({
            prompt: prompt,
            history: history,
        });

        const { audio } = await generateAudioFromText(text);

        return { message: 'success', data: { text, audio } };

    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during chat completion. Please try again.' };
    }
}

export async function createDebateChallenge(prevState: DebateChallengeState, formData: FormData): Promise<DebateChallengeState> {
    const debateInputSchema = z.object({
        topic: z.string().describe('The topic of the debate.'),
        userArgument: z.string().describe("The user's argument or opening statement."),
        debateHistory: z.array(z.object({
            role: z.enum(['user', 'model']),
            content: z.string(),
        })).describe('The history of the debate so far.'),
    });

    const rawData = Object.fromEntries(formData.entries());
    const parsedHistory = JSON.parse(rawData.debateHistory as string);
    
    const validatedFields = debateInputSchema.safeParse({
        topic: rawData.topic,
        userArgument: rawData.userArgument,
        debateHistory: parsedHistory,
    });

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await generateDebateChallenge(validatedFields.data);
        return { message: 'success', data: result.counterArgument };
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during the debate. Please try again.' };
    }
}


export async function createAdaptiveMathProblem(prevState: AdaptiveMathState, formData: FormData): Promise<AdaptiveMathState> {
  const schema = z.object({
    skill: z.enum(['fractions_decimals', 'algebra', 'geometry']),
    difficulty: z.coerce.number().min(1).max(5),
    studentAbility: z.coerce.number(),
    solveHistory: z.string().transform(str => JSON.parse(str)),
  });

  const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateAdaptiveMathProblem(validatedFields.data);
    return { message: 'success', data: result };
  } catch (error) {
    // The flow now handles its own errors and returns a fallback,
    // so this catch block might not be strictly necessary unless the action itself fails.
    // However, to be safe, we can still return an error message.
    console.error(error);
    return { message: 'An error occurred while generating the math problem. Please try again.' };
  }
}
