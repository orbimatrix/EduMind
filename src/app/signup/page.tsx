
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AtSign, Eye, EyeOff, Github, GraduationCap, LockKeyhole, User } from 'lucide-react';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const getPasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return 0;
    if (password.length > 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    return (score / 5) * 100;
};


export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const passwordStrength = getPasswordStrength(password);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'teacher') {
      router.push('/teacher/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-green-300 dark:from-blue-700"></div>
      </div>
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
           <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold">EduMind AI</span>
          </Link>
          <Card className="shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-lg border border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
              <CardDescription>Join EduMind AI to start your smart learning journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                 <div className="space-y-2">
                  <Label>Select Your Role</Label>
                  <RadioGroup defaultValue="student" value={role} onValueChange={setRole} className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="student" id="student" className="peer sr-only" />
                      <Label
                        htmlFor="student"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Student
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                      <Label
                        htmlFor="teacher"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Teacher
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="name" placeholder="John Doe" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="m@example.com" required className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                   {password && (
                      <div className="flex items-center gap-2 pt-1">
                          <Progress value={passwordStrength} className="h-2" />
                          <span className="text-xs text-muted-foreground w-16 text-right">
                              {passwordStrength < 40 ? 'Weak' : passwordStrength < 80 ? 'Medium' : 'Strong'}
                          </span>
                      </div>
                  )}
                </div>
                <Button type="submit" className="w-full font-semibold">
                  Create Account
                </Button>
              </form>
               <Separator className="my-6">
                <span className="px-2 text-xs text-muted-foreground bg-background">OR CONTINUE WITH</span>
              </Separator>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                   <SiGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              <div className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
