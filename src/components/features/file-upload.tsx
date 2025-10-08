
'use client';

import { FileUp, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FileUpload() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-accent/50 p-12 text-center transition-colors hover:border-primary/50 hover:bg-accent">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <FileUp className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-headline text-xl font-semibold">Upload Your Textbook</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Drag & drop or click to upload PDF, EPUB, or plain text files.
      </p>
      <Button variant="outline" className="mt-6 bg-background">
        <Upload className="mr-2" />
        Select File
      </Button>
       <input type="file" className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" disabled />
    </div>
  );
}
