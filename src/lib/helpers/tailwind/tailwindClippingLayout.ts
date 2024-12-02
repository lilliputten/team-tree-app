// TODO: Create `tailwindScrollingWrapper`

import { cn } from '@/lib/utils';

interface TTailwindClippingLayoutParams {
  className?: string;
  clippingLayout?: boolean;
  vertical?: boolean;
  fullSize?: boolean;
}
export function tailwindClippingLayout(params: TTailwindClippingLayoutParams = {}) {
  const {
    // prettier-ignore
    clippingLayout = true,
    className,
    vertical,
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
        vertical && 'flex-col',
      ]
        .filter(Boolean)
        .join(' '),
  );
}
