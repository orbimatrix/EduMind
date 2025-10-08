
import ChatInterface from '@/components/features/chat-interface';
import { Card, CardContent } from '@/components/ui/card';
import { MessagesSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <MessagesSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold">Interactive Chat Support</h1>
          <p className="mt-1 text-muted-foreground">
            Ask questions, get instant feedback, and explore topics with your AI study assistant.
          </p>
        </div>
      </div>

      <Card className="shadow-sm h-[calc(100vh-16rem)] overflow-hidden">
        <CardContent className="p-0 h-full">
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  );
}
