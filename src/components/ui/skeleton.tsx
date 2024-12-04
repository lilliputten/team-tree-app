import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // prettier-ignore
        '__Skeleton',
        className,
        'animate-pulse rounded-md bg-muted',
      )}
      {...props}
    />
  );
}

export { Skeleton };
