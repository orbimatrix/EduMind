
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createDebateChallenge } from '@/lib/actions';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormSubmitButton } from '@/components/features/form-submit-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Bot, GraduationCap, Loader2, User } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

const debateSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  userArgument: z.string().min(10, 'Argument must be at least 10 characters long.'),
});

type FormData = z.infer<typeof debateSchema>;

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function DebateArena() {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(createDebateChallenge, { message: '' });
  
  const [topic, setTopic] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isDebateStarted, setIsDebateStarted] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(debateSchema),
    defaultValues: {
        topic: '',
        userArgument: '',
    }
  });

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error in Debate',
        description: state.message,
      });
    }
    if(state.message === 'success' && state.data) {
        setConversation(prev => [...prev, { role: 'model', content: state.data! }]);
        resetField('userArgument');
    }
  }, [state, toast, resetField]);
  
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isPending]);

  const handleStartDebate = (data: FormData) => {
    setTopic(data.topic);
    setConversation([{ role: 'user', content: data.userArgument }]);
    setIsDebateStarted(true);

    const formData = new FormData();
    formData.append('topic', data.topic);
    formData.append('userArgument', data.userArgument);
    formData.append('debateHistory', JSON.stringify([{ role: 'user', content: data.userArgument }]));
    formAction(formData);
  };
  
  const handleContinueDebate = (data: FormData) => {
    const newConversation: Message[] = [...conversation, { role: 'user', content: data.userArgument }];
    setConversation(newConversation);

    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('userArgument', data.userArgument);
    formData.append('debateHistory', JSON.stringify(newConversation));
    formAction(formData);
  };

  if (isDebateStarted) {
    return (
      <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Debate Topic: <span className="font-normal">{topic}</span></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                 {conversation.map((msg, index) => (
                    <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' && 'justify-end')}>
                       {msg.role === 'model' && (
                           <Avatar className="h-8 w-8 border shrink-0">
                               <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                                   <Bot className="h-5 w-5" />
                               </div>
                           </Avatar>
                       )}
                       <div className={cn('max-w-md rounded-lg px-4 py-2 shadow-sm', msg.role === 'model' ? 'bg-card border' : 'bg-primary text-primary-foreground')}>
                            <p className="text-sm">{msg.content}</p>
                       </div>
                       {msg.role === 'user' && (
                            <Avatar className="h-8 w-8 border shrink-0">
                               <div className="flex h-full w-full items-center justify-center bg-muted">
                                   <User className="h-5 w-5 text-muted-foreground" />
                               </div>
                           </Avatar>
                       )}
                    </div>
                ))}
                 {isPending && (
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border shrink-0">
                           <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                               <Bot className="h-5 w-5" />
                           </div>
                       </Avatar>
                        <div className="max-w-xs lg:max-w-md rounded-lg px-4 py-3 shadow-sm bg-card border flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
                 <div ref={conversationEndRef} />
            </CardContent>
        </Card>
        
        <form onSubmit={handleSubmit(handleContinueDebate)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userArgument" className="font-semibold">Your Counter-Argument</Label>
            <Textarea
              id="userArgument"
              placeholder="Respond to the AI's challenge..."
              className="min-h-24"
              {...register('userArgument')}
              disabled={isPending}
            />
            {errors.userArgument && (
              <p className="text-sm text-destructive">
                {errors.userArgument.message}
              </p>
            )}
          </div>
          <FormSubmitButton disabled={isPending}>{isPending ? "Thinking..." : "Submit Response"}</FormSubmitButton>
          <Button variant="outline" onClick={() => setIsDebateStarted(false)} disabled={isPending}>End Debate</Button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleStartDebate)} className="space-y-4">
       <div className="space-y-2">
            <Label htmlFor="topic">Debate Topic</Label>
            <Input id="topic" placeholder="e.g., 'Is artificial intelligence a threat to humanity?'" {...register('topic')} />
            {errors.topic && (
                <p className="text-sm text-destructive">{errors.topic.message}</p>
            )}
       </div>
      <div className="space-y-2">
        <Label htmlFor="userArgument">Your Opening Argument</Label>
        <Textarea
          id="userArgument"
          placeholder="State your position clearly and concisely."
          className="min-h-32"
          {...register('userArgument')}
        />
        {errors.userArgument && (
          <p className="text-sm text-destructive">
            {errors.userArgument.message}
          </p>
        )}
      </div>
      <FormSubmitButton>Start Debate</FormSubmitButton>
    </form>
  );
}
