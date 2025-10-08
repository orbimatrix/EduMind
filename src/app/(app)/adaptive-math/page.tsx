
import AdaptiveMathTutor from '@/components/features/adaptive-math-tutor';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sigma } from 'lucide-react';

export default function AdaptiveMathPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Sigma className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Adaptive Math Practice</h1>
          <p className="mt-1 text-muted-foreground">
            A personalized math learning system that adjusts to your skill level.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Math Tutor</CardTitle>
          <CardDescription>
            Select a topic to start your personalized practice session.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdaptiveMathTutor />
        </CardContent>
      </Card>
    </div>
  );
}
