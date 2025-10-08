
import MaterialAugmenter from '@/components/features/material-augmenter';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export default function AugmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <BrainCircuit className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Augmented Learning Materials</h1>
          <p className="mt-1 text-muted-foreground">
            Enhance study materials with AI-driven web research, difficulty assessments, and real-world applications.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Research a Topic</CardTitle>
          <CardDescription>
            Enter a topic, and our AI will search educational forums, past papers, and more to create a comprehensive resource.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MaterialAugmenter />
        </CardContent>
      </Card>
    </div>
  );
}
