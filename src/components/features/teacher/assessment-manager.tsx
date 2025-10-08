
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit, MoreHorizontal, FileText, CheckCircle, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const assessmentSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  subject: z.string().min(2, 'Subject must be at least 2 characters long.'),
  numQuestions: z.coerce.number().min(1, 'Must have at least one question.'),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

type Assessment = AssessmentFormValues & {
  id: number;
  date: Date;
  status: 'Draft' | 'Published';
};

const initialAssessments: Assessment[] = [
  {
    id: 1,
    title: 'Chapter 5: Forces in Motion',
    subject: 'Physics',
    numQuestions: 20,
    date: new Date(Date.now() - 86400000 * 5),
    status: 'Published',
  },
  {
    id: 2,
    title: 'Midterm Exam',
    subject: 'Algebra II',
    numQuestions: 50,
    date: new Date(Date.now() - 86400000 * 2),
    status: 'Published',
  },
  {
    id: 3,
    title: 'Quiz: The Cell',
    subject: 'Biology',
    numQuestions: 15,
    date: new Date(),
    status: 'Draft',
  },
];

export default function AssessmentManager() {
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [showForm, setShowForm] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
  });

  const onSubmit: SubmitHandler<AssessmentFormValues> = (data) => {
    if (editingAssessment) {
        setAssessments(assessments.map(a => a.id === editingAssessment.id ? { ...a, ...data } : a));
        toast({ title: 'Assessment Updated', description: `"${data.title}" has been updated.`});
        setEditingAssessment(null);
    } else {
        const newAssessment: Assessment = {
        id: Date.now(),
        date: new Date(),
        status: 'Draft',
        ...data,
        };
        setAssessments([newAssessment, ...assessments]);
        toast({
        title: 'Assessment Created',
        description: `"${data.title}" has been saved as a draft.`,
        });
        setShowForm(false);
    }
    reset();
  };

  const deleteAssessment = (id: number) => {
    setAssessments(assessments.filter((a) => a.id !== id));
    toast({
      title: 'Assessment Deleted',
    });
  };

  const toggleStatus = (id: number) => {
    setAssessments(assessments.map(a => {
        if (a.id === id) {
            const newStatus = a.status === 'Draft' ? 'Published' : 'Draft';
            toast({
                title: `Assessment ${newStatus}`,
                description: `"${a.title}" is now ${newStatus.toLowerCase()}.`
            })
            return { ...a, status: newStatus };
        }
        return a;
    }));
  };

  const openEditDialog = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setValue('title', assessment.title);
    setValue('subject', assessment.subject);
    setValue('numQuestions', assessment.numQuestions);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2" /> Create New Assessment
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">New Assessment</CardTitle>
            <CardDescription>
              Set up a new quiz or test. You can add questions later.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} placeholder="e.g., Chapter 1 Quiz" />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...register('subject')} placeholder="e.g., Physics" />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numQuestions">Number of Questions</Label>
                  <Input
                    id="numQuestions"
                    type="number"
                    {...register('numQuestions')}
                    placeholder="e.g., 25"
                  />
                  {errors.numQuestions && (
                    <p className="text-sm text-destructive">{errors.numQuestions.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save as Draft</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {editingAssessment && (
        <AlertDialog open onOpenChange={() => { setEditingAssessment(null); reset(); }}>
            <AlertDialogContent>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Edit Assessment</AlertDialogTitle>
                    <AlertDialogDescription>
                        Make changes to your assessment details below.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input id="edit-title" {...register('title')} />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-subject">Subject</Label>
                                <Input id="edit-subject" {...register('subject')} />
                                {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="edit-numQuestions">Questions</Label>
                                <Input id="edit-numQuestions" type="number" {...register('numQuestions')} />
                                {errors.numQuestions && <p className="text-sm text-destructive">{errors.numQuestions.message}</p>}
                            </div>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Save Changes</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Assessments</CardTitle>
          <CardDescription>An overview of all your created assessments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Subject</TableHead>
                <TableHead className="text-center">Questions</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell className="font-medium">{assessment.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{assessment.subject}</TableCell>
                  <TableCell className="text-center">{assessment.numQuestions}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={assessment.status === 'Published' ? 'secondary' : 'outline'}
                      className={
                        assessment.status === 'Published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                      }
                    >
                      {assessment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{format(assessment.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => openEditDialog(assessment)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => toggleStatus(assessment.id)}>
                            {assessment.status === 'Draft' ? <CheckCircle className="mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
                            <span>{assessment.status === 'Draft' ? 'Publish' : 'Unpublish'}</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem disabled>
                          <Book className="mr-2 h-4 w-4" />
                          <span>Add Questions</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onSelect={() => deleteAssessment(assessment.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
