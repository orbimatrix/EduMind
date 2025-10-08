
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Award, BookCopy, Medal, ShieldCheck, Sparkles, Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import ProfileForm from '@/components/features/profile-form';
import { useGamification } from '@/context/gamification-context';

const allBadges = [
    { id: 'upload-1', icon: Star, title: "First Upload", description: "Uploaded your first document.", requiredXp: 10 },
    { id: 'upload-5', icon: BookCopy, title: "Bookworm", description: "Uploaded 5 documents.", requiredXp: 50 },
    { id: 'verified', icon: ShieldCheck, title: "Verified Contributor", description: "Submitted a high-quality document.", requiredXp: 150 },
    { id: 'master', icon: Medal, title: "Topic Master", description: "Contributed 3 documents on a single topic.", requiredXp: 300 },
    { id: 'scholar', icon: Award, title: "Scholar", description: "Reached Level 5.", requiredXp: 500 },
    { id: 'ai-enthusiast', icon: Sparkles, title: "AI Enthusiast", description: "Used all AI features.", requiredXp: 1000 },
];


export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  const { level, xp, getLevelProgress, levelData, badges } = useGamification();
  const progress = getLevelProgress();
  
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">My Profile</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage your profile, progress, and achievements.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <Avatar className="h-20 w-20">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback>
                    <User className="h-10 w-10" />
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="font-headline text-2xl">Guest User</CardTitle>
                    <CardDescription>guest@edumind.ai</CardDescription>
                </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-muted-foreground">Level {level} - {levelData.title}</span>
                                <span className="text-sm font-bold">{xp} / {levelData.nextLevelXp} XP</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-3">My Subjects</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-secondary text-secondary-foreground py-1 px-3 rounded-full">Physics</span>
                                <span className="text-xs bg-secondary text-secondary-foreground py-1 px-3 rounded-full">Mathematics</span>
                                <span className="text-xs bg-secondary text-secondary-foreground py-1 px-3 rounded-full">Chemistry</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">My Achievements</CardTitle>
                     <CardDescription>Badges earned from your contributions.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-2 gap-4">
                        {allBadges.map((badge) => (
                            <div key={badge.title} className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 text-center ${badges.includes(badge.id) ? 'bg-accent/50' : 'bg-muted/50 opacity-50'}`}>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${badges.includes(badge.id) ? 'bg-primary/10 text-primary' : 'bg-muted-foreground/10 text-muted-foreground'}`}>
                                    <badge.icon className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="text-sm font-semibold">{badge.title}</h5>
                                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Edit Profile</CardTitle>
                    <CardDescription>
                        Update your personal details here. Changes will be saved across the platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
