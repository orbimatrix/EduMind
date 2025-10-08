
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createAdaptiveMathProblem } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Lightbulb, Loader2, Star, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import type { GenerateAdaptiveMathProblemOutput } from '@/ai/flows/generate-adaptive-math-problem';

const mathProblemSchema = z.object({
  skill: z.enum(['fractions_decimals', 'algebra', 'geometry']),
  answer: z.string().min(1, "Please provide an answer."),
});

type FormData = z.infer<typeof mathProblemSchema>;

type SolveHistoryItem = {
  problem: string;
  isCorrect: boolean;
  timeTaken: number;
};

export default function AdaptiveMathTutor() {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(createAdaptiveMathProblem, { message: '' });

  const [skill, setSkill] = useState<'fractions_decimals' | 'algebra' | 'geometry'>('fractions_decimals');
  const [difficulty, setDifficulty] = useState(1);
  const [studentAbility, setStudentAbility] = useState(0.5);
  const [problem, setProblem] = useState<GenerateAdaptiveMathProblemOutput | null>(null);
  const [solveHistory, setSolveHistory] = useState<SolveHistoryItem[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, explanation: string } | null>(null);
  const [startTime, setStartTime] = useState(0);

  const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(mathProblemSchema),
    defaultValues: { skill: 'fractions_decimals' }
  });

  useEffect(() => {
    if (state.message && state.message !== 'success' && !state.data) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Problem',
        description: state.message,
      });
      setIsStarted(false); // Allow retry
    }
    if (state.message === 'success' && state.data) {
      setProblem(state.data);
      setFeedback(null);
      resetField('answer');
      setStartTime(Date.now());
      if (!isStarted) {
        setIsStarted(true);
      }
    }
  }, [state, toast, resetField, isStarted]);

  const handleStartPractice = (formData: FormData) => {
    formData.set('skill', skill);
    formData.set('difficulty', String(difficulty));
    formData.set('studentAbility', String(studentAbility));
    formData.set('solveHistory', JSON.stringify(solveHistory));
    formAction(formData);
  };
  
  const fetchNewProblem = () => {
    const formData = new FormData();
    formData.append('skill', skill);
    formData.append('difficulty', String(difficulty));
    formData.append('studentAbility', String(studentAbility));
    formData.append('solveHistory', JSON.stringify(solveHistory));
    formAction(formData);
  };

  const onAnswerSubmit = (data: FormData) => {
    if (!problem) return;
    setIsSubmitting(true);
    
    // Mock evaluation
    const isCorrect = Math.random() > 0.3; // Simulate 70% chance of being correct
    const timeTaken = (Date.now() - startTime) / 1000;

    setFeedback({
      isCorrect,
      explanation: isCorrect 
        ? "Great job! Your approach was correct." 
        : `Not quite. ${problem.commonMistake}. Remember to ${problem.hint}.`
    });

    const newHistoryItem: SolveHistoryItem = {
      problem: problem.problemStatement,
      isCorrect,
      timeTaken,
    };
    const newHistory = [...solveHistory, newHistoryItem];
    setSolveHistory(newHistory);

    // Update student ability (simplified)
    const abilityChange = isCorrect ? 0.05 : -0.03;
    const newAbility = Math.max(0, Math.min(1, studentAbility + abilityChange));
    setStudentAbility(newAbility);

    // Update difficulty (simplified)
    if (isCorrect && difficulty < 5) setDifficulty(d => d + 1);
    if (!isCorrect && difficulty > 1) setDifficulty(d => d - 1);
    
    setIsSubmitting(false);
  };
  
  const handleNextProblem = () => {
      setProblem(null);
      fetchNewProblem();
  }

  if (!isStarted) {
    return (
      <form action={handleStartPractice} className="flex flex-col items-center gap-4 text-center">
         <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="skill-select">Select a Topic to Practice</Label>
            <Select onValueChange={(value) => setSkill(value as any)} defaultValue={skill}>
                <SelectTrigger id="skill-select">
                    <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fractions_decimals">Fractions & Decimals</SelectItem>
                    <SelectItem value="algebra">Basic Algebra</SelectItem>
                    <SelectItem value="geometry">Geometry Transformations</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <FormSubmitButton size="lg">Start Practice</FormSubmitButton>
      </form>
    );
  }

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-headline capitalize">{skill.replace('_', ' & ')}</CardTitle>
                    <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(level => (
                            <Star key={level} className={cn("h-5 w-5", level <= difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30')} />
                        ))}
                    </div>
                </div>
                <CardDescription>Current Difficulty Level: {difficulty}</CardDescription>
            </CardHeader>
            <CardContent>
                 {(isPending && !problem) ? (
                    <div className="flex items-center justify-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : problem ? (
                    <div className="space-y-4">
                        <p className="font-mono text-lg text-center bg-muted p-6 rounded-md">{problem.problemStatement}</p>
                        
                        <form onSubmit={handleSubmit(onAnswerSubmit)} className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="answer">Your Answer</Label>
                                <Textarea id="answer" {...register('answer')} disabled={!!feedback} />
                                {errors.answer && <p className="text-destructive text-sm">{errors.answer.message}</p>}
                             </div>
                             {!feedback && (
                                <FormSubmitButton disabled={isSubmitting}>
                                    {isSubmitting ? "Checking..." : "Submit Answer"}
                                </FormSubmitButton>
                             )}
                        </form>

                        {feedback && (
                             <Card className={cn(feedback.isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800')}>
                                <CardHeader>
                                    <CardTitle className={cn("flex items-center gap-2 font-headline", feedback.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300')}>
                                        {feedback.isCorrect ? <Check /> : <X />}
                                        {feedback.isCorrect ? 'Correct!' : 'Needs Review'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex items-start gap-3 rounded-md bg-background/50 p-3">
                                        <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Explanation</h4>
                                            <p className="text-sm text-muted-foreground">{feedback.explanation}</p>
                                        </div>
                                    </div>
                                    <Button onClick={handleNextProblem} className="w-full">
                                        Next Problem
                                    </Button>
                                </CardContent>
                             </Card>
                        )}
                    </div>
                ) : (
                     <div className="text-center text-muted-foreground">
                        <p>No problem loaded. Try refreshing.</p>
                     </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
