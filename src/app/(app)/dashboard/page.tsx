
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/features/file-upload';
import { ArrowRight, Award, BrainCircuit, ListTodo, MessageSquareQuote, MessagesSquare, Search, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/context/gamification-context';

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
  const { level, xp, getLevelProgress, levelData } = useGamification();
  const progress = getLevelProgress();

  return (
    <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Level {level}</div>
                    <p className="text-xs text-muted-foreground">{levelData.title}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">XP Progress</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{xp} / {levelData.nextLevelXp}</div>
                    <Progress value={progress} className="h-2 mt-1" />
                </CardContent>
            </Card>
             <Card className="col-span-1 md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Reward</CardTitle>
                    <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Level {level + 1} Badge</div>
                    <p className="text-xs text-muted-foreground">Unlock the next badge and get premium features.</p>
                </CardContent>
            </Card>
        </div>


      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Vectorize Your Textbook</CardTitle>
            <CardDescription>
              Upload a document to earn 10 XP and start your learning journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Explore Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
