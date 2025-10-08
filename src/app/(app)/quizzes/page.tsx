
import QuizGenerator from '@/components/features/quiz-generator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MessageSquareQuote } from 'lucide-react';

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <MessageSquareQuote className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Quiz & Test Generation</h1>
          <p className="mt-1 text-muted-foreground">
            Dynamically generate quizzes with exam-relevant questions based on any chapter or topic.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Create a New Quiz</CardTitle>
          <CardDescription>
            Specify the topic, exam type, and number of questions to create a practice quiz instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuizGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
