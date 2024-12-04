'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TPropsWithChildrenAndClassName } from '@/shared/types/generic';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/Logo';

function BrandWrapper(props: TPropsWithChildrenAndClassName) {
  const { children, className: parentClassName } = props;
  const pathname = usePathname();
  const isRoot = !pathname || pathname === '/';
  const className = cn(
    // prettier-ignore
    '__BrandWrapper', // DEBUG
    parentClassName,
    'flex',
    'items-center',
    'space-x-1.5',
    'gap-2',
    'transition-all',
    'mr-10',
    !isRoot && 'hover:opacity-80',
  );
  if (isRoot) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link href="/" className={className}>
      {children}
    </Link>
  );
}

export function NavBarBrand() {
  return (
    <BrandWrapper>
      <Logo size="lg" className="size-12" />
      <h1
        role="heading"
        data-testid="NavBarBrandTitle"
        className={cn(
          // prettier-ignore
          'font-urban',
          'text-xl',
          'text-primary-foreground',
          'font-bold',
          'whitespace-nowrap',
          'overflow-hidden',
          'text-ellipsis',
          // 'mr-5',
        )}
      >
        {siteConfig.name}
      </h1>
    </BrandWrapper>
  );
}
