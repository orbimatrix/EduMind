
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Book, CheckSquare, ClipboardList, Construction, FilePlus, Users } from 'lucide-react';
import Link from 'next/link';

const features = [
    { title: "Student Performance", description: "Track individual and class-level progress.", icon: Users },
    { title: "Gradebook", description: "Manage grades and calculate averages.", icon: ClipboardList },
    { title: "Assessments", description: "Create, distribute, and grade tests.", icon: CheckSquare },
    { title: "Resources", description: "Upload and share learning materials.", icon: FilePlus },
    { title: "Announcements", description: "Communicate with your students.", icon: Bell },
    { title: "Curriculum", description: "Manage and build your course content.", icon: Book },
];

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Teacher Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your classroom, track student progress, and create assessments.
          </p>
        </div>
        <Button asChild>
            <Link href="/">Student View</Link>
        </Button>
      </div>

       <Card className="shadow-sm text-center py-20 bg-muted/30">
        <CardContent className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Construction className="h-8 w-8 text-secondary-foreground" />
            </div>
          <h2 className="font-headline text-2xl font-bold">Features Under Construction</h2>
          <p className="max-w-xl mx-auto text-muted-foreground">
            The Teacher Dashboard is currently in development. Soon, you will be able to manage your students, track their performance, and create engaging learning materials right from this page.
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Coming Soon...</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col overflow-hidden opacity-50">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                   <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
