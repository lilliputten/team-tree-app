// TODO: Create `tailwindScrollingWrapper`

import { cn } from '@/lib/utils';

interface TTailwindClippingLayoutParams {
  className?: string;
  clippingLayout?: boolean;
  horizontal?: boolean;
  fullSize?: boolean;
}
export function tailwindClippingLayout(params: TTailwindClippingLayoutParams = {}) {
  const {
    // prettier-ignore
    clippingLayout = true,
    className,
    horizontal,
    fullSize,
  } = params;
  return cn(
    className,
    clippingLayout &&
      [
        // Clipping layout
        '__tailwindClippingLayout',
        // 'h-screen',
        // 'w-screen',
        fullSize && 'flex-1', // TODO: To remove or make optional
        'relative',
        'flex',
        'size-full',
        // 'h-full',
        'overflow-hidden',
        !horizontal && 'flex-col',
      ]
        .filter(Boolean)
        .join(' '),
  );
}
