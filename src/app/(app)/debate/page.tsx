
import DebateArena from '@/components/features/debate-arena';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Swords } from 'lucide-react';

export default function DebatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Swords className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">AI Debate Arena</h1>
          <p className="mt-1 text-muted-foreground">
            Sharpen your arguments and test your knowledge against an AI opponent.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Start a New Debate</CardTitle>
          <CardDescription>
            Enter a topic and your opening argument. The AI will challenge you to defend your position.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DebateArena />
        </CardContent>
      </Card>
    </div>
  );
}
