'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

const studyPlanSchema = z.object({
  bookText: z.string().min(10, 'Textbook content must be at least 10 characters.'), // lowered to be more flexible
  examPatterns: z.string().optional().nullable(),
  availableTime: z.string().optional().nullable(),
});

type FormData = z.infer<typeof studyPlanSchema>;

export default function StudyPlanForm() {
  const { toast } = useToast();
  const [resultText, setResultText] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studyPlanSchema),
  });

  useEffect(() => {
    // clear result when user edits form (optional)
  }, []);

  function parseHours(input?: string | null): number | null {
    if (!input) return null;
    // try to find first number in the string
    const m = input.match(/(\d+(\.\d+)?)/);
    if (!m) return null;
    const val = Number(m[1]);
    if (isNaN(val)) return null;
    return Math.max(0, Math.round(val));
  }

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    setResultText(null);

    // Map form to FastAPI StudyPlanRequest
    const chapters = (data.bookText || '').trim(); // we'll send as 'chapters' so server uses it as query/context
    const hours = parseHours(data.availableTime);

    try {
      const res = await fetch(`${API_BASE}/study-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapters, hours }),
      });

      const json = await res.json();

      if (!res.ok) {
        const err = json?.detail || json?.error || JSON.stringify(json);
        toast({ variant: 'destructive', title: 'Study plan error', description: String(err) });
        setIsPending(false);
        return;
      }

      const result = json.result;
      if (!result) {
        toast({ variant: 'destructive', title: 'Study plan error', description: 'Empty response from server.' });
        setIsPending(false);
        return;
      }

      // result is expected to be a string (LLM output). Render as-is (whitespace preserved).
      setResultText(String(result));
      setIsPending(false);
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Network error', description: String(err) });
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bookText">Textbook Content / Topic</Label>
          <Textarea
            id="bookText"
            placeholder="Paste a chapter excerpt, or write the topic / chapter names you want a plan for..."
            className="min-h-48"
            {...register('bookText')}
          />
          {(errors.bookText) && (
            <p className="text-sm text-destructive">{errors.bookText?.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="examPatterns">Exam Patterns (Optional)</Label>
            <Input id="examPatterns" placeholder="e.g., Board exams, MCQs focus" {...register('examPatterns')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableTime">Available Study Time (Optional)</Label>
            <Input id="availableTime" placeholder="e.g., 2 hours per day (enter a number anywhere in the text)" {...register('availableTime')} />
          </div>
        </div>

        <FormSubmitButton disabled={isPending}>
          {isPending ? 'Generating plan...' : 'Generate Study Plan'}
        </FormSubmitButton>
      </form>

      {resultText && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-green-500" />
              <h3 className="font-headline text-xl font-semibold">Your Personalized Study Plan</h3>
            </div>

            <div className="prose prose-sm max-w-none rounded-md border bg-accent/50 p-4 whitespace-pre-wrap">
              {resultText}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
