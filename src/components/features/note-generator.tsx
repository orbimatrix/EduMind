
'use client';

import { useActionState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNotes } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const noteSchema = z.object({
  sourceContent: z.string().min(50, 'Source content must be at least 50 characters.'),
  detailLevel: z.enum(['concise', 'detailed', 'comprehensive']),
});

type FormData = z.infer<typeof noteSchema>;

export default function NoteGenerator() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createNotes, { message: '' });

  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      sourceContent: '',
      detailLevel: 'detailed',
    },
  });

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error Generating Notes',
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
            placeholder="Paste your academic textbook chapter, technical manual, or research paper here."
            className="min-h-60"
            {...register('sourceContent')}
          />
          {(errors.sourceContent || state.errors?.sourceContent) && (
            <p className="text-sm text-destructive">{errors.sourceContent?.message || state.errors?.sourceContent?.[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="detailLevel">Detail Level</Label>
          <Controller
            name="detailLevel"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="detailLevel">
                  <SelectValue placeholder="Select detail level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
           {(errors.detailLevel || state.errors?.detailLevel) && (
            <p className="text-sm text-destructive">{errors.detailLevel?.message || state.errors?.detailLevel?.[0]}</p>
          )}
        </div>

        <FormSubmitButton>Generate Notes</FormSubmitButton>
      </form>

      {state.data && state.message === 'success' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              <CardTitle className="font-headline">Generated Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none rounded-md border bg-muted/50 p-4 dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: state.data.notes.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
