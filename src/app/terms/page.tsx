
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { GraduationCap, FileText, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SiDiscord } from '@icons-pack/react-simple-icons';

export default function TermsPage() {
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
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-headline text-4xl font-bold">Terms of Service</h1>
              <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert px-6 pb-6">
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the EduMind AI application (the "Service") operated by us.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>

              <h2>2. Use of Service</h2>
              <p>
                You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You are responsible for any content you upload and must ensure you have the necessary rights to use and share that content.
              </p>

              <h2>3. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of EduMind AI and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of EduMind AI.
              </p>

               <h2>4. User Content</h2>
              <p>
                You retain all your rights to any content you submit, post or display on or through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in any and all media or distribution methods. We do not claim ownership of your content, but you grant us a license to use it to provide our service.
              </p>


              <h2>5. Limitation of Liability</h2>
              <p>
                In no event shall EduMind AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h2>6. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:legal@edumind.ai">legal@edumind.ai</a>.
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
