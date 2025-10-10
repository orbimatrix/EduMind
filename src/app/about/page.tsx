
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { GraduationCap, Users, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SiDiscord } from '@icons-pack/react-simple-icons';

export default function AboutPage() {
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
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-headline text-4xl font-bold">About EduMind AI</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Revolutionizing the way students learn, one book at a time.
              </p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert px-6 pb-6">
              <p>
                EduMind AI was born from a simple idea: what if your textbook could talk back? In a world of passive reading and endless highlighting, we imagined a more interactive, personalized, and effective way to study. We are a team of passionate educators, engineers, and AI enthusiasts dedicated to making learning more engaging and accessible for everyone.
              </p>

              <div className="my-8 flex justify-center">
                 <Image
                    src="https://picsum.photos/seed/team/800/400"
                    alt="Team working together"
                    width={800}
                    height={400}
                    className="rounded-lg border shadow-lg"
                    data-ai-hint="team collaboration"
                />
              </div>

              <h2>Our Mission</h2>
                <p>
                  Our mission is to empower students to achieve their full academic potential by transforming static study materials into dynamic, AI-powered learning companions. We believe that by leveraging cutting-edge technology, we can create a more equitable and effective educational landscape where every student has the tools they need to succeed.
                </p>

               <h2>Why EduMind AI?</h2>
                <p>
                    Traditional studying can be isolating and inefficient. Students spend hours reading dense texts, struggling to identify key concepts and gauge their own understanding. EduMind AI breaks this cycle by providing:
                </p>
                <ul>
                    <li><strong>Instant Clarification:</strong> Get answers to your questions in real-time, just like you would with a personal tutor.</li>
                    <li><strong>Personalized Roadmaps:</strong> Our AI generates study plans tailored to your specific needs and timeline.</li>
                    <li><strong>Active Recall Practice:</strong> Dynamically generated quizzes help you test your knowledge and retain information more effectively.</li>
                    <li><strong>Deeper Insights:</strong> We augment your learning materials with real-world examples and web research, connecting concepts to the bigger picture.</li>
                </ul>

                <p>
                    Join us on our journey to make studying smarter, not harder.
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
