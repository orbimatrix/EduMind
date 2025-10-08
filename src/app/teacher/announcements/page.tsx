
import AnnouncementsManager from '@/components/features/teacher/announcements-manager';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Bell className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Announcements</h1>
          <p className="mt-1 text-muted-foreground">
            Create and manage announcements for your students.
          </p>
        </div>
      </div>
      
      <AnnouncementsManager />
    </div>
  );
}
