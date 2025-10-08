
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createStudyPlan } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const studyPlanSchema = z.object({
  bookText: z.string().min(50, 'Textbook content must be at least 50 characters.'),
  examPatterns: z.string().optional(),
  availableTime: z.string().optional(),
});

type FormData = z.infer<typeof studyPlanSchema>;

export default function StudyPlanForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createStudyPlan, { message: '' });

  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studyPlanSchema),
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

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bookText">Textbook Content</Label>
          <Textarea
            id="bookText"
            placeholder="Paste a chapter or a large section of your textbook here..."
            className="min-h-48"
            {...register('bookText')}
          />
          {(errors.bookText || state.errors?.bookText) && (
            <p className="text-sm text-destructive">{errors.bookText?.message || state.errors?.bookText?.[0]}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="examPatterns">Exam Patterns (Optional)</Label>
            <Input id="examPatterns" placeholder="e.g., Board exams, MCQs focus" {...register('examPatterns')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableTime">Available Study Time (Optional)</Label>
            <Input id="availableTime" placeholder="e.g., 2 hours per day" {...register('availableTime')} />
          </div>
        </div>
        <FormSubmitButton>Generate Study Plan</FormSubmitButton>
      </form>

      {state.data && (
        <Card>
          <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-green-500" />
                <h3 className="font-headline text-xl font-semibold">Your Personalized Study Plan</h3>
            </div>
            <div className="prose prose-sm max-w-none rounded-md border bg-accent/50 p-4 whitespace-pre-wrap">
                {state.data}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
