
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { GraduationCap, SendHorizontal, User, Volume2, Loader2, StopCircle } from 'lucide-react';
import { createChatCompletion } from '@/lib/actions';
import { useActionState } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  audioData?: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm EduMind AI. How can I help you with your studies today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const viewportRef = useRef<HTMLDivElement>(null);
  
  const [state, formAction, isPending] = useActionState(createChatCompletion, {
    message: '',
    chatHistory: messages.map(({ audioData, ...rest }) => rest), // Don't send audio data in history
  });

  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (state.message === 'success' && state.data) {
        const botMessage: Message = {
            id: Date.now() + 1,
            text: state.data.text,
            sender: 'bot',
            audioData: state.data.audio,
        };
        setMessages((prev) => [...prev, botMessage]);
    } else if (state.message && state.message !== 'success') {
        // Handle error if needed
        console.error("Error from chat completion:", state.message);
    }
  }, [state]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    
    const formData = new FormData();
    formData.append('prompt', input);
    formData.append('chatHistory', JSON.stringify([...messages, userMessage].map(({ audioData, ...rest }) => rest)));

    (e.target as HTMLFormElement).action = () => formAction(formData);
    
    setInput('');
  };

  const handleFormAction = (formData: FormData) => {
      if (!input.trim() || isPending) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        
        formData.set('prompt', input);
        formData.set('chatHistory', JSON.stringify([...messages, userMessage].map(({ audioData, ...rest }) => rest)));

        formAction(formData);

        setInput('');
  }

  const toggleAudio = (message: Message) => {
    if (playingAudioId === message.id) {
        // Stop currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setPlayingAudioId(null);
    } else if (message.audioData) {
        // Stop any previous audio
        if (audioRef.current) {
            audioRef.current.pause();
        }
        
        const newAudio = new Audio(message.audioData);
        audioRef.current = newAudio;
        
        newAudio.play().catch(e => console.error("Audio play failed:", e));
        setPlayingAudioId(message.id);
        
        newAudio.onended = () => {
            setPlayingAudioId(null);
        };
    }
  };


  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1" viewportRef={viewportRef}>
        <div className="p-4 md:p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.sender === 'user' && 'flex-row-reverse'
              )}
            >
              <Avatar className="h-8 w-8 border">
                {message.sender === 'bot' ? (
                   <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                    <GraduationCap className="h-5 w-5" />
                   </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                   </div>
                )}
              </Avatar>
              <div
                className={cn(
                  'max-w-xs lg:max-w-md rounded-lg px-4 py-2 shadow-sm flex items-center gap-2',
                  message.sender === 'bot'
                    ? 'bg-card border'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                <p className="text-sm">{message.text}</p>
                 {message.sender === 'bot' && message.audioData && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => toggleAudio(message)}>
                        {playingAudioId === message.id ? <StopCircle className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                )}
              </div>
            </div>
          ))}
          {isPending && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border">
                <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </Avatar>
              <div className="max-w-xs lg:max-w-md rounded-lg px-4 py-3 shadow-sm bg-card border flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4">
        <form action={handleFormAction} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your textbook..."
            className="flex-1"
            autoComplete="off"
            name="prompt"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
            {isPending ? <Loader2 className="animate-spin"/> : <SendHorizontal />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
