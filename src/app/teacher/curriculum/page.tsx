
import CurriculumManager from '@/components/features/teacher/curriculum-manager';
import { Book } from 'lucide-react';

export default function CurriculumPage() {
  return (
    <div className="space-y-6">
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

      <CurriculumManager />

    </div>
  );
}
