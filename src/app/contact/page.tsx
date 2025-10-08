
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
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
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-4xl font-bold">Contact Us</CardTitle>
                <CardDescription className="mt-2 text-lg">
                    We&apos;d love to hear from you.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 text-center px-6 pb-6">
                <p className="text-muted-foreground">
                    Have a question, feedback, or a partnership inquiry? Reach out to our team, and we&apos;ll get back to you as soon as possible.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                     <Button asChild size="lg">
                        <a href="mailto:hello@edumind.ai">
                            <Mail className="mr-2" /> Email Us
                        </a>
                    </Button>
                     <Button asChild size="lg" variant="outline">
                        <Link href="#">
                            <MessageSquare className="mr-2" /> Chat on Discord
                        </Link>
                    </Button>
                </div>
                <div className="pt-4">
                    <p className="text-sm text-muted-foreground">You can also find us on social media.</p>
                     <div className="mt-4 flex justify-center gap-4">
                         <Link href="#" className="text-muted-foreground hover:text-primary">Twitter</Link>
                         <Link href="#" className="text-muted-foreground hover:text-primary">LinkedIn</Link>
                         <Link href="#" className="text-muted-foreground hover:text-primary">GitHub</Link>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
