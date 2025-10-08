
'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/study-plan': 'Study Plan Generator',
  '/quizzes': 'Quiz & Test Generation',
  '/summarizer': 'Chapter Summarizer',
  '/flashcards': 'Flashcard Generator',
  '/notes': 'Note Generator',
  '/topics': 'Past Paper Topic Extraction',
  '/augment': 'Augmented Learning Materials',
  '/chat': 'Interactive Chat Support',
  '/knowledge-graph': 'Knowledge Graph',
  '/profile': 'My Profile',
};

export default function AppHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'EduMind AI';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
       <div className="flex items-center gap-2">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-semibold text-primary">EduMind</span>
        </Link>
      </div>

      <div className="hidden md:block">
        <h1 className="font-headline text-xl font-semibold md:text-2xl">{title}</h1>
      </div>

      <div className="ml-auto">
        <Button asChild>
            <Link href="/">Home</Link>
        </Button>
      </div>
    </header>
  );
}
