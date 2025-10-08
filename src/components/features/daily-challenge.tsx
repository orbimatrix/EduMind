'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Zap, Check, X, Sparkles, Lightbulb } from 'lucide-react';
import { getDailyQuizQuestion } from '@/lib/actions';
import { useGamification } from '@/context/gamification-context';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { GenerateDailyQuizQuestionOutput } from '@/ai/flows/generate-daily-quiz-question';

const subjects = ['Mathematics', 'Computer Science', 'Medical Terminology'];

export default function DailyChallenge() {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<GenerateDailyQuizQuestionOutput | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addXp } = useGamification();
  const { toast } = useToast();

  const dailySubject = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 1000 / 60 / 60 / 24);
    return subjects[dayOfYear % subjects.length];
  }, []);

  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setQuestion(null);
    setSelectedOption(null);
    setIsAnswered(false);

    const result = await getDailyQuizQuestion({ subject: dailySubject });
    
    if (result.message === 'success' && result.data) {
      setQuestion(result.data);
    } else {
      setError(result.message || 'Failed to load daily challenge.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message || 'Could not load the daily challenge. Please try again later.',
      });
    }
    setIsLoading(false);
  }, [dailySubject, toast]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === question?.correctAnswer) {
      addXp(5);
      toast({
        title: 'Correct!',
        description: 'You earned 5 XP!',
      });
    } else {
        toast({
            variant: 'destructive',
            title: 'Incorrect',
            description: 'Better luck next time!',
        });
    }
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) return 'border-border hover:bg-accent';
    if (option === question?.correctAnswer) return 'bg-green-100/80 border-green-300 text-green-900 dark:bg-green-900/50 dark:border-green-700 dark:text-green-200';
    if (option === selectedOption) return 'bg-red-100/80 border-red-300 text-red-900 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200';
    return 'border-border';
  };

  const getOptionIcon = (option: string) => {
    if (!isAnswered) return <div className="h-4 w-4" />;
    if (option === question?.correctAnswer) return <Check className="h-4 w-4 text-green-600" />;
    if (option === selectedOption) return <X className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  return (
    <Card className="bg-gradient-to-br from-accent/30 to-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-xl">Daily Challenge</CardTitle>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{dailySubject}</span>
        </div>
         <CardDescription>Test your knowledge with a quick question and earn XP.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchQuestion} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
        {question && !isLoading && (
          <div className="space-y-4">
            <p className="font-semibold">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  className={cn("w-full justify-start h-auto py-2", getOptionClass(option))}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isAnswered}
                >
                  <div className="mr-2">{getOptionIcon(option)}</div>
                  <span className="flex-1 text-left whitespace-normal">{option}</span>
                </Button>
              ))}
            </div>
             {isAnswered && (
                 <div className="flex items-start gap-3 rounded-md bg-muted/50 p-3">
                    <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <h4 className="font-semibold">Explanation</h4>
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
