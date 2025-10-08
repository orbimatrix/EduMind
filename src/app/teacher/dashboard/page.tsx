
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Book, CheckSquare, ClipboardList, Construction, FilePlus, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
    { title: "Student Performance", description: "Track individual and class-level progress.", icon: Users, href: "/teacher/performance", enabled: true },
    { title: "Gradebook", description: "Manage grades and calculate averages.", icon: ClipboardList, href: "/teacher/gradebook", enabled: true },
    { title: "Assessments", description: "Create, distribute, and grade tests.", icon: CheckSquare, href: "#", enabled: false },
    { title: "Resources", description: "Upload and share learning materials.", icon: FilePlus, href: "#", enabled: false },
    { title: "Announcements", description: "Communicate with your students.", icon: Bell, href: "#", enabled: false },
    { title: "Curriculum", description: "Manage and build your course content.", icon: Book, href: "#", enabled: false },
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
            <Link href="/dashboard">Student View</Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Classroom Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className={`flex flex-col overflow-hidden transition-all ${!feature.enabled ? 'opacity-50' : 'hover:shadow-lg'}`}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                   <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
                 {!feature.enabled && (
                  <div className="mt-2 text-xs font-semibold text-primary/80 flex items-center gap-2">
                    <Construction className="h-4 w-4" />
                    <span>Coming Soon</span>
                  </div>
                )}
              </CardContent>
               <div className="p-6 pt-0">
                <Button asChild variant="secondary" className="w-full" disabled={!feature.enabled}>
                  <Link href={feature.href}>
                    Go to Feature <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
