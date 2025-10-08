
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-8">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold">EduMind AI</span>
          </Link>
          <nav>
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Go to App
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-4xl font-bold">Documentation</CardTitle>
                <CardDescription className="text-lg">
                    Your guide to using and integrating EduMind AI.
                </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <p>
                    Welcome to the EduMind AI documentation. This section is currently under development and will soon be filled with comprehensive guides, tutorials, and API references to help you get the most out of our platform.
                </p>
                <h2>Coming Soon</h2>
                <ul>
                    <li><strong>Getting Started Guide:</strong> A step-by-step tutorial on how to upload your first textbook and start using the core features.</li>
                    <li><strong>Feature Guides:</strong> In-depth explanations of the Study Plan Generator, Quiz Generation, Interactive Chat, and other key functionalities.</li>
                    <li><strong>For Developers:</strong> Information on how to integrate EduMind AI's capabilities into your own applications using our API.</li>
                    <li><strong>Frequently Asked Questions (FAQ):</strong> Answers to common questions and troubleshooting tips.</li>
                </ul>
                <p>
                    Thank you for your patience as we build out this resource. In the meantime, feel free to explore the application and discover its features firsthand!
                </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
