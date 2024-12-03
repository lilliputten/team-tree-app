import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        // prettier-ignore
        '__Skeleton',
        className,
        'bg-muted animate-pulse rounded-md',
      )}
      {...props}
    />
  );
}

export { Skeleton };
