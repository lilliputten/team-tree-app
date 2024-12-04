'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { siteMenu } from '@/config/siteMenu';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/layout/ModeToggle';
import { NavBarBrand } from '@/components/layout/NavBarBrand';
import { Icons } from '@/components/shared/icons';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';

interface NavBarProps {
  large?: boolean;
}

export function NavBar(props: NavBarProps) {
  const { large } = props;
  const links = siteMenu.mainNav;
  return (
    <header
      className={cn(
        '__NavBar', // DEBUG
        'sticky',
        'top-0',
        'z-40',
        'flex',
        'w-full',
        'bg-primary',
        commonXPaddingTwStyle,
        'justify-center',
        'transition-all',
        // 'h-14',
        // 'lg:h-[60px]',
        // 'xl:px-8',
      )}
    >
      <MaxWidthWrapper
        className={cn(
          // prettier-ignore
          // 'flex max-w-7xl items-center gap-x-3 px-0',
          // 'h-24',
          'flex',
          'items-center',
          'justify-between',
          'py-2',
          'z-10',
        )}
        large={large}
      >
        <div className="flex gap-6 md:gap-10">
          <NavBarBrand />
          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={'navbar-' + String(index)}
                  href={item.disabled ? '#' : item.href}
                  prefetch
                  className={cn(
                    'flex',
                    'items-center',
                    'text-lg',
                    'font-medium',
                    'transition-all',
                    'text-primary-foreground/80',
                    'opacity-100',
                    'hover:opacity-80',
                    'sm:text-sm',
                    // item.href.startsWith(`/${selectedLayout}`) && 'text-app-orange',
                    item.disabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div
          className={cn(
            '__NavBar_Right', // DEBUG
            'items-center space-x-3',
            'hidden',
            'md:flex',
          )}
        >
          {/* Right header for extra stuff */}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'inline-flex',
              'items-center',
              'justify-center',
              'size-8 rounded-sm px-0',
              'text-primary-foreground hover:bg-primary-400/50',
            )}
          >
            <Icons.github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ModeToggle onRed />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
