
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { GraduationCap, SendHorizontal, User } from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
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

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "This is a placeholder response. The full chat functionality will be implemented with a backend AI model.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
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
                  'max-w-xs lg:max-w-md rounded-lg px-4 py-2 shadow-sm',
                  message.sender === 'bot'
                    ? 'bg-card border'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your textbook..."
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <SendHorizontal />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
