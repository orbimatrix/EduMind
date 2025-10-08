
import Gradebook from '@/components/features/teacher/gradebook';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

export default function GradebookPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Gradebook</h1>
          <p className="mt-1 text-muted-foreground">
            Manage student grades, track performance, and calculate final scores.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Class Grades</CardTitle>
            <CardDescription>An overview of student performance across all assignments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Gradebook />
        </CardContent>
      </Card>
      
    </div>
  );
}
