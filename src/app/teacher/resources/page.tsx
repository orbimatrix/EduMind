
import ResourceManager from '@/components/features/teacher/resource-manager';
import { FilePlus } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <FilePlus className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Learning Resources</h1>
          <p className="mt-1 text-muted-foreground">
            Upload, organize, and share documents, videos, and links.
          </p>
        </div>
      </div>

      <ResourceManager />
    </div>
  );
}
