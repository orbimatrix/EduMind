
import TopicExtractor from '@/components/features/topic-extractor';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function TopicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Past Paper Topic Extraction</h1>
          <p className="mt-1 text-muted-foreground">
            Highlight key examination focus areas from past board papers to guide your study.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Find Important Topics</CardTitle>
          <CardDescription>
            Provide content from your textbook and a query for past papers to identify high-priority topics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TopicExtractor />
        </CardContent>
      </Card>
    </div>
  );
}
