'use client';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SignInBlock } from '@/components/blocks/SignInBlock';
import { WelcomeVisualBlock } from '@/components/blocks/WelcomeVisualBlock';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { isDev } from '@/constants';

export function WelcomeScreen(props: TPropsWithClassName) {
  const { className } = props;
  const { isBelowMd } = useMediaQuery();

  return (
    <div
      className={cn(
        isDev && '__WelcomeScreen', // DEBUG
        isDev && isBelowMd && '__Small',
        className,
        'flex flex-1 flex-col-reverse md:flex-row',
        'gap-8',
        'items-stretch',
        'justify-stretch',
        !isBelowMd && 'layout-follow',
        isBelowMd && 'overflow-auto',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <div
        className={cn(
          isDev && '__WelcomeScreen:SignIn', // DEBUG
          'flex-1',
          'flex flex-col',
          !isBelowMd && 'overflow-auto',
        )}
      >
        <SignInBlock />
      </div>
      <div
        className={cn(
          isDev && '__WelcomeScreen:Info', // DEBUG
          'flex-1',
          'flex flex-col',
          'bg-primary-500/20',
          !isBelowMd && 'overflow-auto',
        )}
      >
        <WelcomeVisualBlock />
      </div>
    </div>
  );
}
