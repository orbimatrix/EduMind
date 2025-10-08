
import ChapterSummarizer from '@/components/features/chapter-summarizer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookText } from 'lucide-react';

export default function SummarizerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <BookText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Chapter Summarizer</h1>
          <p className="mt-1 text-muted-foreground">
            Get structured summaries, key terms, and more from any chapter.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Summarize a Chapter</CardTitle>
          <CardDescription>
            Paste your chapter content below and select the document type to generate a detailed summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChapterSummarizer />
        </CardContent>
      </Card>
    </div>
  );
}
