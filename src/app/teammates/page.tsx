
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { GraduationCap, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SiDiscord } from '@icons-pack/react-simple-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teammates = [
  {
    name: 'Saqib Iqbal',
    role: 'Full stack',
    email: 'saqibiqbal27772@gmail.com',
    avatarUrl: 'https://picsum.photos/seed/saqib/200/200',
  },
  {
    name: 'Saqin Sharif',
    role: 'Gen AI & Team Lead',
    email: 'msaqibsharif430@gmail.com',
    avatarUrl: 'https://picsum.photos/seed/saqin/200/200',
  },
  {
    name: 'Mashood Farid',
    role: 'Ui/UX Designer',
    email: 'mashood.farid@example.com',
    avatarUrl: 'https://picsum.photos/seed/mashood/200/200',
  },
  {
    name: 'Ammar Ahmad',
    role: 'Project documentation and debugging',
    email: 'ammarahmad526@gmail.com',
    avatarUrl: 'https://picsum.photos/seed/ammar/200/200',
  },
];

export default function TeammatesPage() {
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
        <div className="mx-auto max-w-5xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl font-bold">Meet the Team</CardTitle>
              <CardDescription className="mt-2 text-lg">
                The minds behind EduMind AI.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {teammates.map((teammate) => (
                  <Card key={teammate.name} className="flex flex-col items-center text-center p-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={teammate.avatarUrl} alt={teammate.name} data-ai-hint="person portrait" />
                      <AvatarFallback>{teammate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-semibold">{teammate.name}</h3>
                    <p className="text-muted-foreground">{teammate.role}</p>
                    <div className="mt-4 flex gap-2">
                      <a href={`mailto:${teammate.email}`} className={buttonVariants({ variant: 'ghost', size: 'icon' })}><Mail /></a>
                    </div>
                  </Card>
                ))}
              </div>
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
