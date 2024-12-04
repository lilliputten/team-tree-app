import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function MaxWidthWrapper({
  className,
  children,
  large = false,
}: {
  className?: string;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        '__MaxWidthWrapper', // DEBUG
        className,
        'container',
        large ? 'max-w-screen-2xl' : 'max-w-5xl',
      )}
    >
      {children}
    </div>
  );
}
