
'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Book,
  BrainCircuit,
  Bot,
  FileUp,
  GraduationCap,
  Lightbulb,
  ListTodo,
  MessageSquareQuote,
  Sparkles,
  Search,
  BookOpenCheck,
  Github,
  Linkedin,
  Disc,
  Menu,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';

const featureCards = [
  {
    title: 'Smart Knowledge Extraction',
    description: 'Our RAG engine understands your book like a seasoned professor.',
    icon: BookOpenCheck,
  },
  {
    title: 'Conversational Study Assistant',
    description: 'Chat with your textbook to clarify doubts and explore concepts.',
    icon: Bot,
  },
  {
    title: 'AI Study Plan Generator',
    description: 'Get a personalized, 2-week study roadmap in seconds.',
    icon: ListTodo,
  },
  {
    title: 'Quiz & Test Generation',
    description: 'Create exam-style quizzes from any chapter to test your knowledge.',
    icon: MessageSquareQuote,
  },
  {
    title: 'Internet-Augmented Insights',
    description: 'Enrich your learning with real-world applications and web research.',
    icon: Lightbulb,
  },
  {
    title: 'Key Topic Identification',
    description: 'Automatically find the most important topics from past papers.',
    icon: Search,
  },
];

const howItWorksSteps = [
  {
    title: 'Upload Your Textbook',
    description: 'Drag and drop your textbook in PDF or EPUB format. EduMind supports a wide range of documents.',
    icon: FileUp,
  },
  {
    title: 'AI Builds a Knowledge Base',
    description: 'Our AI engine processes the content, creating a vectorized knowledge base for intelligent querying.',
    icon: BrainCircuit,
  },
  {
    title: 'Study Smarter, Not Harder',
    description: 'Chat with your book, generate quizzes, and get a personalized study plan instantly.',
    icon: Sparkles,
  },
];

const advancedFeatures = [
    {
        title: 'Understands Your Book Like a Teacher',
        description: 'EduMind uses a state-of-the-art Retrieval-Augmented Generation (RAG) engine. This means it doesn\'t just search for keywords; it understands the context and concepts within your textbook, allowing for nuanced conversations and accurate answers.',
        image: PlaceHolderImages.find(p => p.id === 'augment'),
    },
    {
        title: 'Finds Important Topics Automatically',
        description: 'Stop guessing what to study. Our AI analyzes past exam papers and your textbook content to identify and highlight the most frequently tested and crucial topics, ensuring your study time is spent effectively.',
        image: PlaceHolderImages.find(p => p.id === 'topics'),
    },
    {
        title: 'Creates Exam-Style Quizzes with Instant Feedback',
        description: 'Move beyond simple flashcards. EduMind generates multiple-choice questions that mimic exam formats. Each quiz comes with detailed explanations, helping you learn from your mistakes immediately.',
        image: PlaceHolderImages.find(p => p.id === 'quiz'),
    }
]

const useCases = [
    {
        for: 'Students',
        description: 'Ace your exams by studying more efficiently. Turn long reading hours into interactive, engaging sessions.',
        icon: GraduationCap,
    },
    {
        for: 'Teachers',
        description: 'Instantly generate relevant quiz materials and supplemental content for your classroom.',
        icon: Book,
    },
    {
        for: 'EdTech Innovators',
        description: 'Integrate EduMind’s powerful AI brain into your own educational products and platforms.',
        icon: Lightbulb,
    }
]

const techStack = [
    { name: 'Gemini', category: 'AI Model' },
    { name: 'Genkit', category: 'AI Toolkit' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'Firebase', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'ShadCN UI', category: 'Components' },
];


export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-8">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold">EduMind AI</span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
             <Link href="#features" className={buttonVariants({ variant: 'ghost' })}>Features</Link>
             <Link href="#how-it-works" className={buttonVariants({ variant: 'ghost' })}>How It Works</Link>
             <Link href="#use-cases" className={buttonVariants({ variant: 'ghost' })}>Use Cases</Link>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex h-full flex-col p-6">
                    <Link href="/" className="mb-8 flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                        <GraduationCap className="h-7 w-7 text-primary" />
                        <span className="font-headline text-xl font-bold">EduMind AI</span>
                    </Link>
                    <nav className="flex flex-col gap-4 text-lg">
                        <Link href="#features" onClick={() => setMenuOpen(false)} className="py-2">Features</Link>
                        <Link href="#how-it-works" onClick={() => setMenuOpen(false)} className="py-2">How It Works</Link>
                        <Link href="#use-cases" onClick={() => setMenuOpen(false)} className="py-2">Use Cases</Link>
                    </nav>
                    <Separator className="my-6" />
                    <div className="flex flex-col gap-4">
                        <Button variant="outline" asChild>
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/dashboard">Get Started</Link>
                        </Button>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
                >
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-green-300 dark:from-blue-700"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
                </div>
                <div className="relative text-center">
                    <Badge variant="secondary" className="mb-4">Your AI-Powered Study Companion</Badge>
                    <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Study Smarter with EduMind 🧠
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        Upload any book and let AI turn it into a personalized tutor, quiz generator, and study planner.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button size="lg" asChild>
                            <Link href="/dashboard">
                                Get Started <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="#features">Learn More</Link>
                        </Button>
                    </div>
                    <div className="relative mt-12 md:mt-16 mx-auto max-w-4xl">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                        {heroImage &&
                            <Image
                                src={heroImage.imageUrl}
                                alt="EduMind App Preview"
                                width={1200}
                                height={600}
                                className="rounded-lg border shadow-2xl"
                                data-ai-hint={heroImage.imageHint}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>


        {/* Key Features Section */}
        <section id="features" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold sm:text-4xl">Core Functionalities</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover the AI-powered features that will revolutionize your study routine.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => (
                <Card key={feature.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold sm:text-4xl">A Simple 3-Step Flow</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Getting started with EduMind is as easy as one, two, three.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {howItWorksSteps.map((step, index) => (
                        <Card key={step.title} className="flex flex-col items-center p-6 text-center">
                             <div className="relative mb-6">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>
                                <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                                    {index + 1}
                                </span>
                            </div>
                            <h3 className="font-headline text-xl font-semibold">{step.title}</h3>
                            <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        {/* Smart Features Section */}
        <section id="smart-features" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold sm:text-4xl">AI in Action: A Deeper Look</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore some of the advanced capabilities that make EduMind an unparalleled study partner.
                    </p>
                </div>
                <div className="mt-12 space-y-12">
                    {advancedFeatures.map((feature, index) => (
                        <div key={feature.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                            <div className={index % 2 === 1 ? 'md:order-2' : 'md:order-1'}>
                                 {feature.image &&
                                    <Image
                                        src={feature.image.imageUrl}
                                        alt={feature.title}
                                        width={600}
                                        height={400}
                                        className="rounded-lg border shadow-lg"
                                        data-ai-hint={feature.image.imageHint}
                                    />
                                }
                            </div>
                            <div className={index % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                                <h3 className="font-headline text-2xl font-bold">{feature.title}</h3>
                                <p className="mt-4 text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Use Cases Section */}
        <section id="use-cases" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-3xl font-bold sm:text-4xl">Who Is It For?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        EduMind is designed for anyone passionate about learning and teaching more effectively.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {useCases.map((useCase) => (
                        <Card key={useCase.for}>
                            <CardHeader className="flex-row items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <useCase.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="font-headline">{useCase.for}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{useCase.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-3xl font-bold sm:text-4xl">Powered by Cutting-Edge Technology</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We use the best tools to deliver a seamless and intelligent learning experience.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-2 rounded-lg border bg-background p-3 shadow-sm">
                            <span className="font-semibold">{tech.name}</span>
                            <Badge variant="secondary">{tech.category}</Badge>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* CTA Section */}
        <section id="cta" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to Study Smarter?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Join EduMind today and experience an AI that learns your syllabus.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                     <Button size="lg" asChild>
                        <Link href="/dashboard">Try Demo</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Contact Team</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-full md:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="h-7 w-7 text-primary" />
                <span className="font-headline text-xl font-bold">EduMind AI</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Supercharging your study sessions with the power of AI.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link></li>
                <li><Link href="/#use-cases" className="text-sm text-muted-foreground hover:text-foreground">Use Cases</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">Docs</Link></li>
              </ul>
            </div>
            <div>
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
                <Link href="#" className={buttonVariants({ variant: 'ghost', size: 'icon' })}><Disc/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
