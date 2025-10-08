
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createAugmentedContent } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

const augmentSchema = z.object({
  topic: z.string().min(3, 'Topic is required and must be at least 3 characters.'),
});

type FormData = z.infer<typeof augmentSchema>;

export default function MaterialAugmenter() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createAugmentedContent, { message: '' });

  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(augmentSchema),
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
          <Label htmlFor="topic">Topic to Research</Label>
          <Input id="topic" placeholder="e.g., 'Newton's Laws of Motion'" {...register('topic')} />
          {(errors.topic || state.errors?.topic) && (
            <p className="text-sm text-destructive">{errors.topic?.message || state.errors?.topic?.[0]}</p>
          )}
        </div>
        <FormSubmitButton>Augment Content</FormSubmitButton>
      </form>

      {state.data && (
        <Card>
          <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-green-500" />
                <h3 className="font-headline text-xl font-semibold">Augmented Learning Material</h3>
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
