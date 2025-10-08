
import AssessmentManager from '@/components/features/teacher/assessment-manager';
import { CheckSquare } from 'lucide-react';

export default function AssessmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <CheckSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Assessment Management</h1>
          <p className="mt-1 text-muted-foreground">
            Create, distribute, and grade tests and quizzes for your students.
          </p>
        </div>
      </div>

      <AssessmentManager />
    </div>
  );
}
