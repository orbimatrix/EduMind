
import FlashcardGenerator from '@/components/features/flashcard-generator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export default function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Layers className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Flashcard Generator</h1>
          <p className="mt-1 text-muted-foreground">
            Automatically create flashcards from your notes or textbook content.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Create a New Set of Flashcards</CardTitle>
          <CardDescription>
            Paste your educational content below, and the AI will generate a set of flashcards for you to study.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FlashcardGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
