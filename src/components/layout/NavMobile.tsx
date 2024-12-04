'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { siteMenu } from '@/config/siteMenu';
import { commonXMarginTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/layout/ModeToggle';
import { Icons } from '@/components/shared/icons';

export function NavMobile() {
  const [open, setOpen] = React.useState(false);
  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === 'docs';

  const links = siteMenu.mainNav;
  const hasLinks = !!links?.length;

  // prevent body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          '__NavMobile', // DEBUG
          'fixed',
          'right-0',
          'top-3.5',
          'z-50',
          'rounded-full',
          'p-2',
          commonXMarginTwStyle,
          // 'mx-8',
          'transition-colors',
          'duration-200',
          'text-primary-foreground hover:bg-primary-400/50',
          'focus:outline-none',
          'active:bg-primary-300',
          'md:hidden',
          open && 'hover:bg-primary-400',
        )}
      >
        {open ? (
          <X className="size-5 text-primary-foreground" />
        ) : (
          <Menu className="size-5 text-primary-foreground" />
        )}
      </button>

      <nav
        className={cn(
          '__NavMobile', // DEBUG
          'fixed',
          'inset-0',
          'z-20',
          'hidden',
          'w-full',
          'overflow-auto',
          'bg-background',
          'px-5',
          'pb-5',
          'pt-32',
          'lg:hidden',
          open && 'block',
        )}
      >
        <ul className="grid divide-y divide-muted">
          {hasLinks &&
            links.map(({ title, href }) => (
              <li key={href} className="py-3">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  {title}
                </Link>
              </li>
            ))}
        </ul>

        {documentation ? <div className="mt-8 block md:hidden">DocsSidebarNav</div> : null}

        <div className="mt-5 flex items-center justify-end space-x-4">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn('hover:bg-accent hover:text-accent-foreground')}
          >
            <Icons.github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
