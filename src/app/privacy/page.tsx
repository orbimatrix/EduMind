
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { GraduationCap, Shield, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SiDiscord } from '@icons-pack/react-simple-icons';

export default function PrivacyPage() {
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
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-headline text-4xl font-bold">Privacy Policy</h1>
              <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert px-6 pb-6">
                <p>
                    Welcome to EduMind AI. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy sets out how we collect, use, and protect any information that you give us when you use this application.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                    We may collect the following information:
                </p>
                <ul>
                    <li><strong>Account Information:</strong> When you register for an account, we may collect your name, email address, and other contact details.</li>
                    <li><strong>Uploaded Content:</strong> We collect and process the textbooks and other study materials you upload to provide our services. This content is used to generate study plans, quizzes, and chat responses.</li>
                    <li><strong>Usage Data:</strong> We may collect data about how you interact with our application, such as features used and time spent on the platform, to help us improve our services.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Provide, operate, and maintain our services.</li>
                    <li>Improve, personalize, and expand our services.</li>
                    <li>Understand and analyze how you use our services.</li>
                    <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                </ul>

                <h2>3. Data Security</h2>
                <p>
                    We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online. Your uploaded content is processed securely and is not shared with third parties without your consent.
                </p>

                <h2>4. Your Data Rights</h2>
                <p>
                    You have the right to access, update, or delete the information we have on you. You can manage your account and content directly within the application or by contacting us for assistance.
                </p>

                <h2>5. Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@edumind.ai">privacy@edumind.ai</a>.
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
