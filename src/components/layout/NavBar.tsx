'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { env } from '@/env';
import { siteMenu } from '@/config/siteMenu';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { NavAuthButton } from '@/components/layout/NavAuthButton';
import { NavBarBrand } from '@/components/layout/NavBarBrand';
import { NavLocaleSwitcher } from '@/components/layout/NavLocaleSwitcher';
import { NavModeToggle } from '@/components/layout/NavModeToggle';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { isDev } from '@/constants';

interface NavBarProps {
  large?: boolean;
  isUser: boolean;
  isUserRequired: boolean;
}

export function NavBar(props: NavBarProps) {
  const { large, isUser, isUserRequired } = props;
  // const useRequiredOnly = !env.USER_REQUIRED || isUser;
  const links = siteMenu.mainNav;
  const t = useTranslations('SiteMenu');
  // const user = await getCurrentUser();

  return (
    <header
      className={cn(
        isDev && '__NavBar', // DEBUG
        'sticky',
        'top-0',
        'z-40',
        'flex',
        'w-full',
        'bg-primary',
        commonXPaddingTwStyle,
        'justify-center',
        'transition-all',
      )}
    >
      <MaxWidthWrapper
        className={cn(
          // prettier-ignore
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
              {links
                .filter((item) => !isUserRequired || !item.userRequiredOnly || isUser)
                .map((item, index) => (
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
                      item.disabled && 'cursor-not-allowed opacity-50',
                    )}
                  >
                    {t(item.titleId)}
                  </Link>
                ))}
            </nav>
          ) : null}
        </div>

        <div
          className={cn(
            isDev && '__NavBar_Right', // DEBUG
            'items-center space-x-3',
            'hidden',
            'md:flex',
          )}
        >
          {/* Right header for extra stuff */}
          {/* TODO: Put github link to the footer
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
          */}
          <NavModeToggle onPrimary />
          <NavLocaleSwitcher onPrimary />
          <NavAuthButton onPrimary />
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
