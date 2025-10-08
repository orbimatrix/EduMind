
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
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const curriculumSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
});

type CurriculumFormValues = z.infer<typeof curriculumSchema>;

type CurriculumUnit = CurriculumFormValues & {
  id: number;
};

const initialUnits: CurriculumUnit[] = [
    { id: 1, title: "Unit 1: Introduction to Physics", description: "Covering the fundamental concepts of classical mechanics, thermodynamics, and electromagnetism." },
    { id: 2, title: "Unit 2: Algebra Fundamentals", description: "An introduction to algebraic expressions, equations, and functions." },
];


export default function CurriculumManager() {
  const [units, setUnits] = useState<CurriculumUnit[]>(initialUnits);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumSchema),
  });

  const onSubmit: SubmitHandler<CurriculumFormValues> = (data) => {
    const newUnit: CurriculumUnit = {
      id: Date.now(),
      ...data,
    };
    setUnits([newUnit, ...units]);
    reset();
    setShowForm(false);
    toast({
      title: 'Curriculum Unit Added',
      description: `"${data.title}" has been successfully created.`,
    });
  };

  const deleteUnit = (id: number) => {
    setUnits(units.filter((unit) => unit.id !== id));
     toast({
      title: 'Unit Deleted',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!showForm && (
            <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2" /> Add Curriculum Unit
            </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">New Curriculum Unit</CardTitle>
            <CardDescription>Define a new unit for your course.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Unit Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} className="min-h-32" />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); reset(); }}>Cancel</Button>
                <Button type="submit">Create Unit</Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <Card>
        <CardHeader>
            <CardTitle>Course Units</CardTitle>
            <CardDescription>An overview of all the units in your curriculum.</CardDescription>
        </CardHeader>
        <CardContent>
             {units.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                    <BookOpen className="mx-auto h-12 w-12" />
                    <p className="mt-4">No curriculum units have been created yet.</p>
                </div>
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {units.map((unit) => (
                        <AccordionItem value={`item-${unit.id}`} key={unit.id}>
                            <AccordionTrigger>
                                <div className='flex justify-between items-center w-full pr-4'>
                                    <span>{unit.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground">{unit.description}</p>
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="sm" onClick={() => deleteUnit(unit.id)}>
                                            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                            Delete Unit
                                        </Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
