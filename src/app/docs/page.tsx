
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { GraduationCap, BookOpen, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SiDiscord } from '@icons-pack/react-simple-icons';

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
                <CardDescription className="mt-2 text-lg">
                    Your guide to using and integrating EduMind AI.
                </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert px-6 pb-6">
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

      <footer className="border-t bg-background">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-full lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-bold">EduMind AI</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Supercharging your study sessions with the power of AI.
              </p>
            </div>
            <div className="col-start-auto col-span-1">
              <h3 className="font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link></li>
                <li><Link href="/#use-cases" className="text-sm text-muted-foreground hover:text-foreground">Use Cases</Link></li>
              </ul>
            </div>
            <div className="col-start-auto col-span-1">
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/teammates" className="text-sm text-muted-foreground hover:text-foreground">Teammates</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">Docs</Link></li>
              </ul>
            </div>
            <div className="col-start-auto col-span-1">
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} EduMind AI. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
                <Link href="#" className={buttonVariants({ variant: 'ghost', size: 'icon' })}><Github/></Link>
                <Link href="#" className={buttonVariants({ variant: 'ghost', size: 'icon' })}><Linkedin/></Link>
                <Link href="#" className={buttonVariants({ variant: 'ghost', size: 'icon' })}><SiDiscord /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
