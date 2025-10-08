'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/augment-learning-materials-with-web-research.ts';
import '@/ai/flows/extract-key-topics-from-past-papers.ts';
import '@/ai/flows/generate-exam-relevant-quizzes.ts';
import '@/ai/flows/generate-personalized-study-plan.ts';
import '@/ai/flows/generate-quiz-from-chapter.ts';
import '@/ai/flows/generate-chapter-summary.ts';
import '@/ai/flows/generate-flashcards.ts';
import '@/ai/flows/generate-notes.ts';
import '@/ai/flows/generate-daily-quiz-question.ts';
import '@/ai/flows/generate-audio-from-text.ts';
import '@/ai/flows/generate-debate-challenge.ts';
