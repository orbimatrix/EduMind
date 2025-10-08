
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/features/file-upload';
import { ArrowRight, BrainCircuit, ListTodo, MessageSquareQuote, MessagesSquare, Search, User, Edit } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const featureCards = [
  {
    title: 'Study Plan Generator',
    description: 'Create a personalized 2-week revision plan.',
    href: '/study-plan',
    icon: ListTodo,
  },
  {
    title: 'Quiz Generation',
    description: 'Test your knowledge with exam-style MCQs.',
    href: '/quizzes',
    icon: MessageSquareQuote,
  },
  {
    title: 'Interactive Chat',
    description: 'Ask questions and get instant support.',
    href: '/chat',
    icon: MessagesSquare,
  },
  {
    title: 'Key Topic Extraction',
    description: 'Find key topics from past board papers.',
    href: '/topics',
    icon: Search,
  },
  {
    title: 'Augmented Learning',
    description: 'Enhance materials with web research.',
    href: '/augment',
    icon: BrainCircuit,
  },
];

export default function DashboardPage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <h1 className="font-headline text-3xl font-bold md:text-4xl lg:text-5xl">Welcome to EduMind AI</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Your intelligent, adaptive learning companion. Upload your textbook and let our AI transform your study sessions.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/study-plan">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-headline text-2xl font-bold">Start Learning</h2>
          <Card>
            <CardHeader>
              <CardTitle>Vectorize Your Textbook</CardTitle>
              <CardDescription>
                Create a knowledge base from your textbook to enable contextual interactions and personalized learning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-bold">My Profile</h2>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-xl">Guest User</CardTitle>
                <CardDescription>guest@edumind.ai</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-muted-foreground">Study Progress</span>
                    <span className="text-sm font-bold">42%</span>
                  </div>
                  <Progress value={42} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">My Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground py-1 px-2 rounded-full">Physics</span>
                    <span className="text-xs bg-secondary text-secondary-foreground py-1 px-2 rounded-full">Mathematics</span>
                    <span className="text-xs bg-secondary text-secondary-foreground py-1 px-2 rounded-full">Chemistry</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2" />
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Explore Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <Card key={feature.href} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                   <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="secondary" className="w-full">
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
