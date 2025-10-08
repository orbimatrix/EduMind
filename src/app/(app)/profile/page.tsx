
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import ProfileForm from '@/components/features/profile-form';

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">My Profile</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage your profile information.
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
                <div className="space-y-6">
                    <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Study Progress</span>
                        <span className="text-sm font-bold">42%</span>
                    </div>
                    <Progress value={42} />
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
