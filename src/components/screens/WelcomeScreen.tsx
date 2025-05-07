'use client';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { InfoBlock } from '@/components/blocks/InfoBlock';
import { SignInBlock } from '@/components/blocks/SignInBlock';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { isDev } from '@/constants';

export function WelcomeScreen(props: TPropsWithClassName) {
  const { className } = props;
  const { isSm } = useMediaQuery();

  return (
    <div
      className={cn(
        isDev && '__WelcomeScreen', // DEBUG
        className,
        'flex flex-1 flex-col md:flex-row',
        'gap-8',
        'items-stretch',
        'justify-stretch',
        !isSm && 'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <div
        className={cn(
          isDev && '__WelcomeScreen:SignIn', // DEBUG
          'flex-1',
          'flex flex-col',
          'overflow-auto',
        )}
      >
        <SignInBlock />
      </div>
      <div
        className={cn(
          isDev && '__WelcomeScreen:Info', // DEBUG
          'flex-1',
          'flex flex-col',
          'bg-primary-500/50',
          'overflow-auto',
        )}
      >
        <InfoBlock />
      </div>
    </div>
  );
}
