
import StudentRoster from '@/components/features/teacher/student-roster';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function StudentPerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Student Performance</h1>
          <p className="mt-1 text-muted-foreground">
            Monitor class progress and view individual student analytics.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Class Roster</CardTitle>
            <CardDescription>An overview of all students in your class.</CardDescription>
        </CardHeader>
        <CardContent>
            <StudentRoster />
        </CardContent>
      </Card>
      
    </div>
  );
}
