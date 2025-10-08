
'use client';

import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type FormSubmitButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export function FormSubmitButton({ children, ...props }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
