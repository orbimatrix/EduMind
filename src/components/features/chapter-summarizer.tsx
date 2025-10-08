
'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createChapterSummary } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, FlaskConical, Key, Pilcrow } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '../ui/badge';
import { GenerateChapterSummaryInputSchema } from '@/ai/flows/generate-chapter-summary';

type FormData = z.infer<typeof GenerateChapterSummaryInputSchema>;

export default function ChapterSummarizer() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createChapterSummary, { message: '' });

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(GenerateChapterSummaryInputSchema),
    defaultValues: {
      documentType: 'Textbook',
    },
  });

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error Generating Summary',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="chapterContent">Chapter Content</Label>
          <Textarea
            id="chapterContent"
            placeholder="Paste the full text of the chapter you want to summarize here."
            className="min-h-60"
            {...register('chapterContent')}
          />
          {(errors.chapterContent || state.errors?.chapterContent) && (
            <p className="text-sm text-destructive">
              {errors.chapterContent?.message || state.errors?.chapterContent?.[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentType">Document Type</Label>
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger id="documentType">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Textbook">Textbook</SelectItem>
                  <SelectItem value="Novel">Novel</SelectItem>
                  <SelectItem value="Research Paper">Research Paper</SelectItem>
                  <SelectItem value="Scientific Journal">Scientific Journal</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {(errors.documentType || state.errors?.documentType) && (
            <p className="text-sm text-destructive">
              {errors.documentType?.message || state.errors?.documentType?.[0]}
            </p>
          )}
        </div>

        <FormSubmitButton>Generate Summary</FormSubmitButton>
      </form>

      {state.data && state.message === 'success' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500" />
              <CardTitle className="font-headline">Chapter Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {state.data.theme && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold">
                  <Pilcrow className="text-primary" />
                  Chapter Theme
                </h4>
                <p className="text-muted-foreground italic">"{state.data.theme}"</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold">
                <Key className="text-primary" />
                Key Terms
              </h4>
              <div className="space-y-2">
                {state.data.keyTerms.map((item) => (
                  <div key={item.term} className="text-sm">
                    <span className="font-semibold">{item.term}:</span>{' '}
                    <span className="text-muted-foreground">{item.definition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Bullet Points</h4>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {state.data.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            {state.data.formulas && state.data.formulas.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 font-semibold">
                  <FlaskConical className="text-primary" />
                  Key Formulas
                </h4>
                <div className="space-y-2">
                  {state.data.formulas.map((formula, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 text-sm font-mono">
                      {formula}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Minimal Controller component for use with react-hook-form and shadcn-ui
const Controller = ({ name, control, render }: any) => {
  const { setValue } = useForm();
  return render({
    field: {
      name,
      onChange: (value: any) => setValue(name, value),
      value: control.defaultValuesRef.current[name]
    }
  });
};
