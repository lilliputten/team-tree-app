'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  return (
    <div
      className={cn(
        '__NotFoundPage', // DEBUG
        'gap-6',
        'flex-1',
        'flex flex-col',
        'layout-follow',
        'justify-center',
        'items-center',
      )}
    >
      <h1 className="text-2xl font-normal">Error: Page not found!</h1>
      <div className="flex flex-row gap-2 text-base text-muted-foreground">
        <Button onClick={() => router.back()}>Go back</Button>
        <Button onClick={() => router.push('/')}>Go home</Button>
      </div>
    </div>
  );
}
