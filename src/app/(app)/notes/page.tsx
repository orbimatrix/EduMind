
import NoteGenerator from '@/components/features/note-generator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ClipboardEdit } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <ClipboardEdit className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">AI Note Generator</h1>
          <p className="mt-1 text-muted-foreground">
            Transform lengthy text chapters into clear, structured, and digestible notes.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Generate New Notes</CardTitle>
          <CardDescription>
            Paste your source material below, choose a detail level, and let the AI create structured notes for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NoteGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
