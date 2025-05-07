'use client';

import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ModalContext } from '@/components/modals/providers';
import { Icons } from '@/components/shared/icons';

import { NavUserAccount } from './NavUserAccount';

interface TNavAuthButtonProps extends TPropsWithClassName {
  onPrimary?: boolean;
}

export function NavAuthButton(props: TNavAuthButtonProps) {
  const { onPrimary, className } = props;
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);
  const t = useTranslations('NavAuthButton');

  const rootClassName = cn(
    '__NavAuthButton', // DEBUG
    className,
    // isPending && 'transition-opacity [&:disabled]:opacity-30',
  );

  return (
    <div
      className={cn(
        // prettier-ignore
        rootClassName,
        'flex',
        'items-center',
      )}
    >
      {session ? (
        <>
          <NavUserAccount onPrimary={onPrimary} />
          {/*
          <Link href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="md:block">
            <Button className="gap-2 px-5" variant={onPrimary ? 'ghostOnPrimary' : 'ghost'} size="sm">
              <span>{t('Dashboard')}</span>
            </Button>
          </Link>
          */}
        </>
      ) : status === 'unauthenticated' ? (
        <Button
          className="gap-2 px-5 md:flex"
          variant={onPrimary ? 'ghostOnPrimary' : 'ghost'}
          size="sm"
          onClick={() => setShowSignInModal(true)}
        >
          <span>{t('sign-in')}</span>
          <Icons.arrowRight className="size-4" />
        </Button>
      ) : (
        <Skeleton className="h-9 w-28 rounded-full lg:flex" />
      )}
    </div>
  );
}
