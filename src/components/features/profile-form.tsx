
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

// Mock server action
async function updateProfile(prevState: any, formData: FormData) {
    console.log('Updating profile with:', Object.fromEntries(formData.entries()));
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate error
    // return { message: 'Failed to update profile. Please try again.' };
    return { message: 'success' };
}


const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subjects: z.string().optional(),
});

type FormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateProfile, { message: '' });

  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
        name: 'Guest User',
        email: 'guest@edumind.ai',
        subjects: 'Physics, Mathematics, Chemistry'
    }
  });

  useEffect(() => {
    if (state.message) {
      if(state.message === 'success') {
        toast({
            title: 'Profile Updated',
            description: 'Your profile has been updated successfully.',
        });
      } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="subjects">My Subjects</Label>
            <Textarea 
                id="subjects"
                placeholder="e.g., Physics, Mathematics, History"
                {...register('subjects')} 
            />
            <p className="text-xs text-muted-foreground">
                Enter your subjects separated by commas.
            </p>
        </div>
      <FormSubmitButton>Save Changes</FormSubmitButton>
    </form>
  );
}
