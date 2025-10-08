
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createQuiz } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, HelpCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import React from 'react';

const quizSchema = z.object({
  topic: z.string().min(3, 'Topic is required and must be at least 3 characters.'),
  examType: z.string().min(3, 'Exam type is required and must be at least 3 characters.'),
  numQuestions: z.coerce.number().min(1).max(10),
});

type FormData = z.infer<typeof quizSchema>;

export default function QuizGenerator() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createQuiz, { message: '' });
  const [numQuestions, setNumQuestions] = React.useState(5);

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      numQuestions: 5,
    },
  });

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);
  
  useEffect(() => {
    setValue('numQuestions', numQuestions);
  }, [numQuestions, setValue]);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="topic">Chapter or Topic</Label>
            <Input id="topic" placeholder="e.g., Work, Power, Energy" {...register('topic')} />
            {(errors.topic || state.errors?.topic) && (
                <p className="text-sm text-destructive">{errors.topic?.message || state.errors?.topic?.[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="examType">Exam Type</Label>
            <Input id="examType" placeholder="e.g., Board Exam" {...register('examType')} />
            {(errors.examType || state.errors?.examType) && (
                <p className="text-sm text-destructive">{errors.examType?.message || state.errors?.examType?.[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numQuestions">Number of Questions: <Badge variant="secondary">{numQuestions}</Badge></Label>
          <Slider
            id="numQuestions"
            min={1}
            max={10}
            step={1}
            value={[numQuestions]}
            onValueChange={(value) => setNumQuestions(value[0])}
          />
           {(errors.numQuestions || state.errors?.numQuestions) && (
                <p className="text-sm text-destructive">{errors.numQuestions?.message || state.errors?.numQuestions?.[0]}</p>
            )}
        </div>
        <input type="hidden" {...register('numQuestions')} />
        <FormSubmitButton>Generate Quiz</FormSubmitButton>
      </form>

      {state.data?.quizQuestions && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Custom Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {state.data.quizQuestions.map((q, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>
                    <div className="flex items-start gap-4 text-left">
                        <HelpCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{i + 1}. {q.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pl-8">
                      <div className="space-y-2">
                        {q.options.map((option, j) => (
                          <div key={j} className="flex items-center gap-2">
                            {option === q.correctAnswer ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                            <span className={option === q.correctAnswer ? 'font-semibold' : ''}>{option}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start gap-3 rounded-md bg-accent/50 p-3">
                        <Lightbulb className="h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                            <h4 className="font-semibold">Explanation</h4>
                            <p className="text-sm text-muted-foreground">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
