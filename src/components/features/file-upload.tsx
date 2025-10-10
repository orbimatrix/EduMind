'use client';

import { FileUp, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGamification } from '@/context/gamification-context';
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ingestFile } from '@/lib/api';

export default function FileUpload() {
  const { addXp } = useGamification();
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const resetState = useCallback(() => {
    setIsUploading(false);
    setIsComplete(false);
    setStatus(null);
    setSelectedFileName(null);
  }, []);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setIsComplete(false);
      setStatus(null);

      try {
        const resp = await ingestFile(file);
        // ingestFile returns parsed JSON; in our FastAPI it includes message/index_size/docs_count
        const msg = (resp && (resp.message || resp.result)) ?? 'Ingested successfully.';
        setStatus(typeof msg === 'string' ? msg : JSON.stringify(msg));
        addXp(10);
        toast({
          title: 'Upload Complete!',
          description: 'You earned 10 XP for uploading your textbook.',
        });
        setIsComplete(true);

        // keep the success UI briefly, then reset the input for more uploads
        setTimeout(() => {
          setIsComplete(false);
          setSelectedFileName(null);
        }, 4000);
      } catch (err: any) {
        console.error('File ingest error:', err);
        const message = err?.message || 'Upload failed. Please try again.';
        setStatus(message);
        toast({
          title: 'Upload Failed',
          description: String(message),
          variant: 'destructive',
        });
      } finally {
        setIsUploading(false);
      }
    },
    [addXp, toast]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const f = event.target.files?.[0] ?? null;
      if (!f) return;
      setSelectedFileName(f.name);
      handleUpload(f);
      // clear the input so selecting the same file again will fire change event
      event.currentTarget.value = '';
    },
    [handleUpload]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const f = event.dataTransfer.files?.[0] ?? null;
      if (!f) return;
      setSelectedFileName(f.name);
      handleUpload(f);
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

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
        {isUploading ? 'Uploading...' : isComplete ? 'Upload Successful!' : 'Upload Your Textbook'}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {isUploading
          ? 'Analyzing your document...'
          : isComplete
          ? 'You have earned 10 XP.'
          : 'Drag & drop or click to upload PDF, EPUB, or text files.'}
      </p>

      {selectedFileName && (
        <div className="mt-3 text-sm text-muted-foreground">
          <strong>File:</strong> {selectedFileName}
        </div>
      )}

      {!isUploading && !isComplete && (
        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" className="bg-background" onClick={handleButtonClick}>
            <Upload className="mr-2" />
            Select File
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.epub,.txt"
            disabled={isUploading || isComplete}
          />
        </div>
      )}

      {status && (
        <div className="mt-4 text-sm">
          <span className={isComplete ? 'text-green-600' : 'text-rose-600'}>{status}</span>
        </div>
      )}
    </div>
  );
}
