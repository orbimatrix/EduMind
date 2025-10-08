
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createKeyTopics } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

const keyTopicsSchema = z.object({
  textbookContent: z.string().min(50, 'Textbook content must be at least 50 characters.'),
  pastPapersQuery: z.string().min(3, 'Past papers query is required and must be at least 3 characters.'),
});

type FormData = z.infer<typeof keyTopicsSchema>;

export default function TopicExtractor() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(createKeyTopics, { message: '' });

  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(keyTopicsSchema),
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
          <Label htmlFor="textbookContent">Textbook Content</Label>
          <Textarea
            id="textbookContent"
            placeholder="Paste the relevant chapter or section from your textbook."
            className="min-h-40"
            {...register('textbookContent')}
          />
          {(errors.textbookContent || state.errors?.textbookContent) && (
            <p className="text-sm text-destructive">{errors.textbookContent?.message || state.errors?.textbookContent?.[0]}</p>
          )}
        </div>
        <div className="space-y-2">
            <Label htmlFor="pastPapersQuery">Past Papers Query</Label>
            <Input id="pastPapersQuery" placeholder="e.g., 'Physics Class 11 past papers'" {...register('pastPapersQuery')} />
            {(errors.pastPapersQuery || state.errors?.pastPapersQuery) && (
                <p className="text-sm text-destructive">{errors.pastPapersQuery?.message || state.errors?.pastPapersQuery?.[0]}</p>
            )}
        </div>
        <FormSubmitButton>Extract Key Topics</FormSubmitButton>
      </form>

      {state.data && (
        <Card>
          <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-green-500" />
                <h3 className="font-headline text-xl font-semibold">Key Examination Topics</h3>
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
