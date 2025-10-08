
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
import { Plus, Trash2, Link as LinkIcon, Video, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  description: z.string().optional(),
  type: z.enum(['link', 'video', 'document']),
  url: z.string().url('Please enter a valid URL.'),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

type Resource = ResourceFormValues & {
  id: number;
  date: Date;
};

const initialResources: Resource[] = [
    { id: 1, title: "Khan Academy: Intro to Algebra", description: "A great video series covering the basics of Algebra.", type: 'video', url: 'https://www.khanacademy.org/math/algebra', date: new Date(Date.now() - 86400000 * 3) },
    { id: 2, title: "Physics Classroom: Newton's Laws", description: "An interactive tutorial on Newton's Laws of Motion.", type: 'link', url: 'https://www.physicsclassroom.com/class/newtlaws', date: new Date(Date.now() - 86400000) },
    { id: 3, title: "Syllabus for Fall Semester", description: "The official course syllabus.", type: 'document', url: '#', date: new Date(Date.now() - 86400000 * 5) },
];

const typeIcons = {
    link: <LinkIcon className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    document: <FileText className="h-4 w-4" />,
}

export default function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
        type: 'link',
    }
  });

  const onSubmit: SubmitHandler<ResourceFormValues> = (data) => {
    const newResource: Resource = {
      id: Date.now(),
      date: new Date(),
      ...data,
    };
    setResources([newResource, ...resources].sort((a,b) => b.date.getTime() - a.date.getTime()));
    reset();
    setShowForm(false);
    toast({
      title: 'Resource Added',
      description: `"${data.title}" has been successfully added.`,
    });
  };

  const deleteResource = (id: number) => {
    setResources(resources.filter((res) => res.id !== id));
     toast({
      title: 'Resource Deleted',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!showForm && (
            <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2" /> Add New Resource
            </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add New Resource</CardTitle>
            <CardDescription>Add a link, video, or document to share with your class.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Resource Type</Label>
                     <Select name="type" onValueChange={(value) => control.setValue('type', value as any)} defaultValue="link">
                        <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="link">Link</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" {...register('url')} placeholder="https://example.com" />
                    {errors.url && <p className="text-sm text-destructive">{errors.url.message}</p>}
                </div>
               </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" {...register('description')} className="min-h-24" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); reset(); }}>Cancel</Button>
                <Button type="submit">Add Resource</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Shared Resources</h2>
         {resources.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No resources have been shared yet.</p>
        ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((res) => (
                <Card key={res.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="font-headline text-lg flex items-center gap-2">
                                    {typeIcons[res.type]} {res.title}
                                </CardTitle>
                                <CardDescription>Shared on {format(res.date, 'MMM d, yyyy')}</CardDescription>
                            </div>
                             <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => deleteResource(res.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{res.description}</p>
                    </CardContent>
                    <CardFooter>
                         <Button asChild variant="secondary" className="w-full">
                            <a href={res.url} target="_blank" rel="noopener noreferrer">
                                Open Resource <LinkIcon className="ml-2" />
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
