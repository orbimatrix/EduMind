
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFlashcards } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Star, Layers, RefreshCcw } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const flashcardSchema = z.object({
  sourceContent: z.string().min(50, 'Content must be at least 50 characters long.'),
});

type FormData = z.infer<typeof flashcardSchema>;

const difficultyColors = {
  1: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  2: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  3: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  4: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  5: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

function Flashcard({ card }: { card: { term: string; definition: string; difficulty: number; category: string } }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const difficulty: 1 | 2 | 3 | 4 | 5 = Math.max(1, Math.min(5, Math.round(card.difficulty))) as (1 | 2 | 3 | 4 | 5);

  return (
    <div className="perspective-1000">
      <div
        className={cn(
          "relative h-64 w-full transform-style-3d cursor-pointer rounded-lg border shadow-sm transition-transform duration-500",
          isFlipped ? 'rotate-y-180' : ''
        )}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="backface-hidden absolute flex h-full w-full flex-col justify-center items-center rounded-lg bg-card p-4">
          <h3 className="text-center font-headline text-lg font-semibold">{card.term}</h3>
        </div>

        {/* Back */}
        <div className="backface-hidden absolute flex h-full w-full flex-col rounded-lg bg-card p-4 rotate-y-180">
          <div className="flex-1 overflow-auto text-sm text-muted-foreground">
            {card.definition}
          </div>
          <div className="mt-2 flex items-center justify-between pt-2 border-t">
              <Badge variant="outline">{card.category}</Badge>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(level => (
                    <Star key={level} className={cn("h-4 w-4", level <= difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30')} />
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function FlashcardGenerator() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createFlashcards, { message: '' });

  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      sourceContent: "",
    },
  });

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error Generating Flashcards',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sourceContent">Source Material</Label>
          <Textarea
            id="sourceContent"
            placeholder="Paste your lecture notes, textbook chapter, or any educational content here."
            className="min-h-60"
            {...register('sourceContent')}
          />
          {(errors.sourceContent || state.errors?.sourceContent) && (
            <p className="text-sm text-destructive">
              {errors.sourceContent?.message || state.errors?.sourceContent?.[0]}
            </p>
          )}
        </div>

        <FormSubmitButton>Generate Flashcards</FormSubmitButton>
      </form>

      {state.data && state.message === 'success' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" />
                    <CardTitle className="font-headline">Generated Flashcards</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCcw className="h-4 w-4" />
                    <span>Click a card to flip it</span>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {state.data.flashcards.map((card, index) => (
                <Flashcard key={index} card={card} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
