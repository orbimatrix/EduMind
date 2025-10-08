
import KnowledgeGraph from '@/components/features/knowledge-graph';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Share2 } from 'lucide-react';

export default function KnowledgeGraphPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Share2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Knowledge Graph</h1>
          <p className="mt-1 text-muted-foreground">
            Visually explore the connections and relationships between different concepts.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Conceptual Map</CardTitle>
          <CardDescription>
            This graph illustrates how topics are interconnected. Click on nodes to explore further.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KnowledgeGraph />
        </CardContent>
      </Card>
    </div>
  );
}
