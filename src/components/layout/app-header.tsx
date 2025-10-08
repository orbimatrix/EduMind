
'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

const pageTitles: { [key: string]: string } = {
  '/': 'Dashboard',
  '/study-plan': 'Intelligent Study Plan Generator',
  '/quizzes': 'Quiz & Test Generation',
  '/topics': 'Past Paper Topic Extraction',
  '/augment': 'Augmented Learning Materials',
  '/chat': 'Interactive Chat Support',
};

export default function AppHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'EduMind AI';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="font-headline text-xl font-semibold md:text-2xl">{title}</h1>
    </header>
  );
}
