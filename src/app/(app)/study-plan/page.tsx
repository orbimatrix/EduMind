
import StudyPlanForm from '@/components/features/study-plan-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ListTodo } from 'lucide-react';

export default function StudyPlanPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <ListTodo className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Study Plan Generator</h1>
          <p className="mt-1 text-muted-foreground">
            Generate a personalized 2-week study plan based on your textbook and exam patterns.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Create Your Plan</CardTitle>
          <CardDescription>
            Provide your textbook content, relevant exam patterns, and available study time to get a customized plan from our AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudyPlanForm />
        </CardContent>
      </Card>
    </div>
  );
}
