# EduMind AI - Intelligent Learning Companion

EduMind AI is a Next.js application built with Firebase Studio that acts as an intelligent, adaptive learning companion. It leverages Generative AI to transform study sessions and provide personalized learning experiences.

## ✨ Features

- **Personalized Study Plan Generation**: Creates a 2-week study plan based on textbook content and exam patterns.
- **Dynamic Quiz & Test Generation**: Generates exam-relevant quizzes from any chapter or topic to test your knowledge.
- **Interactive Chat Support**: An AI study assistant to answer questions and provide instant feedback.
- **Key Topic Extraction**: Identifies and highlights key examination focus areas from past papers.
- **Augmented Learning Materials**: Enhances study materials with AI-driven web research and real-world applications.
- **Vectorize Textbooks**: Upload your textbook (PDF, EPUB, etc.) to create a searchable knowledge base for contextual interactions.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI**: Google's Gemini models via [Genkit](https://firebase.google.com/docs/genkit)
- **UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deployment**: Firebase App Hosting

## 🏁 Getting Started

The application is designed to run within the Firebase Studio environment.

1.  **Explore the Dashboard**: The main dashboard at the root URL provides an overview of all available features.
2.  **Upload a Textbook**: Start by uploading your textbook on the dashboard to create a knowledge base. This will power the AI features.
3.  **Use the Features**:
    - Generate a study plan on the `/study-plan` page.
    - Create quizzes on the `/quizzes` page.
    - Chat with the AI assistant on the `/chat` page.
    - Extract key topics from past papers at `/topics`.
    - Augment your learning materials at `/augment`.

## 📁 Project Structure

- `src/app/`: Contains the Next.js pages and layouts. The main application logic resides in the `(app)` route group.
- `src/components/`: Shared React components.
  - `features/`: Components that implement a specific application feature.
  - `layout/`: Components for the main application layout (header, sidebar).
  - `ui/`: UI components from ShadCN.
- `src/ai/flows/`: Server-side Genkit flows that interact with the Gemini API.
- `src/lib/`: Utility functions, server actions (`actions.ts`), and placeholder data.
- `public/`: Static assets.
- `tailwind.config.ts`: Configuration for Tailwind CSS.
- `next.config.ts`: Configuration for Next.js.
