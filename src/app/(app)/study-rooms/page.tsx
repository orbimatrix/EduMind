
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Construction } from 'lucide-react';

export default function StudyRoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
            <h1 className="font-headline text-3xl font-bold">Collaborative Study Rooms</h1>
            <p className="mt-1 text-muted-foreground">
                Work with peers, share notes, and quiz each other in real-time.
            </p>
            </div>
        </div>
        <Button>
            <Plus className="mr-2" />
            Create New Room
        </Button>
      </div>

      <Card className="shadow-sm text-center py-20">
        <CardContent className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Construction className="h-8 w-8 text-secondary-foreground" />
            </div>
          <h2 className="font-headline text-2xl font-bold">Feature Under Construction</h2>
          <p className="max-w-md mx-auto text-muted-foreground">
            The collaborative study rooms are coming soon! This feature will allow you to create private or public rooms to study with friends, share documents, and generate group quizzes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
