
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Plus, Construction } from 'lucide-react';

export default function CurriculumPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="font-headline text-3xl font-bold">Curriculum Management</h1>
                <p className="mt-1 text-muted-foreground">
                    Design, organize, and manage your course curriculum.
                </p>
            </div>
        </div>
        <Button>
            <Plus className="mr-2" />
            Add Curriculum Unit
        </Button>
      </div>

      <Card className="shadow-sm text-center py-20">
        <CardContent className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Construction className="h-8 w-8 text-secondary-foreground" />
            </div>
          <h2 className="font-headline text-2xl font-bold">Feature Under Construction</h2>
          <p className="max-w-md mx-auto text-muted-foreground">
            The curriculum management tool is coming soon! This feature will allow you to build lesson plans, organize units, and link resources directly to your curriculum.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
