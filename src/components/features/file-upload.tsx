
'use client';

import { FileUp, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGamification } from '@/context/gamification-context';
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function FileUpload() {
  const { addXp } = useGamification();
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = useCallback(() => {
    setIsUploading(true);
    setIsComplete(false);

    // Simulate upload delay
    setTimeout(() => {
      addXp(10);
      setIsUploading(false);
      setIsComplete(true);
      toast({
        title: 'Upload Complete!',
        description: 'You earned 10 XP for uploading your textbook.',
      });

      // Reset state after a few seconds
      setTimeout(() => {
        setIsComplete(false);
      }, 4000);
    }, 1500);
  }, [addXp, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileUpload();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileUpload();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-accent/50 p-12 text-center transition-colors hover:border-primary/50 hover:bg-accent"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        {isUploading ? (
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        ) : isComplete ? (
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        ) : (
          <FileUp className="h-8 w-8 text-primary" />
        )}
      </div>
      <h3 className="font-headline text-xl font-semibold">
        {isUploading
          ? 'Uploading...'
          : isComplete
          ? 'Upload Successful!'
          : 'Upload Your Textbook'}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {isUploading
          ? 'Analyzing your document...'
          : isComplete
          ? 'You have earned 10 XP.'
          : 'Drag & drop or click to upload PDF, EPUB, or text files.'}
      </p>
      {!isUploading && !isComplete && (
        <Button variant="outline" className="mt-6 bg-background" onClick={handleButtonClick}>
          <Upload className="mr-2" />
          Select File
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.epub,.txt"
        disabled={isUploading || isComplete}
      />
    </div>
  );
}
