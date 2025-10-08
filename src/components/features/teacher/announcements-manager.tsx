
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Pin, PinOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const announcementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

type Announcement = AnnouncementFormValues & {
  id: number;
  date: Date;
  pinned: boolean;
};

const initialAnnouncements: Announcement[] = [
    { id: 1, title: "Welcome to Class!", content: "Welcome to the new semester. Please review the syllabus and be prepared for our first class on Monday.", date: new Date(Date.now() - 86400000 * 2), pinned: true },
    { id: 2, title: "Midterm Exam Schedule", content: "The midterm exam will be held on October 25th during the regular class period. It will cover chapters 1-5.", date: new Date(Date.now() - 86400000), pinned: false },
];


export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
  });

  const onSubmit: SubmitHandler<AnnouncementFormValues> = (data) => {
    const newAnnouncement: Announcement = {
      id: Date.now(),
      date: new Date(),
      pinned: false,
      ...data,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    reset();
    setShowForm(false);
    toast({
      title: 'Announcement Posted',
      description: `"${data.title}" has been successfully posted.`,
    });
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
     toast({
      title: 'Announcement Deleted',
    });
  };

  const togglePin = (id: number) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, pinned: !a.pinned } : a
      )
    );
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.date.getTime() - a.date.getTime();
  });


  return (
    <div className="space-y-6">
      {!showForm && (
        <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2" /> Create Announcement
            </Button>
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">New Announcement</CardTitle>
            <CardDescription>Compose a new announcement to share with your class.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" {...register('content')} className="min-h-32" />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); reset(); }}>Cancel</Button>
                <Button type="submit">Post Announcement</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Posted Announcements</h2>
         {sortedAnnouncements.length === 0 ? (
            <p className="text-muted-foreground">No announcements have been posted yet.</p>
        ) : (
            sortedAnnouncements.map((ann) => (
                <Card key={ann.id} className={ann.pinned ? 'border-primary/50 bg-primary/5' : ''}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="font-headline">{ann.title}</CardTitle>
                                <CardDescription>Posted on {format(ann.date, 'MMMM d, yyyy')}</CardDescription>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={() => togglePin(ann.id)}>
                                    {ann.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(ann.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{ann.content}</p>
                    </CardContent>
                </Card>
            ))
        )}
      </div>
    </div>
  );
}
