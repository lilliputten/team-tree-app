import Image from 'next/image';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SmallIntroText } from '@/components/screens/SmallIntroText';
import { isDev } from '@/constants';

import svgArt from './assets/login-blue.svg';

export function WelcomeVisualBlock(props: TPropsWithClassName) {
  const { className } = props;
  const { isSm } = useMediaQuery();
  return (
    <div
      className={cn(
        isDev && '__WelcomeVisualBlock', // DEBUG
        className,
        'm-4',
        'gap-4',
        'flex flex-1 flex-col',
        'items-stretch',
        'justify-center',
      )}
    >
      <Image
        // priority
        src={svgArt}
        alt="Sign in illustration"
        className={cn(
          isDev && '__WelcomeVisualBlock:Art', // DEBUG
          'mx-auto mt-4',
          isSm && 'max-w-xs',
          // isBelowMd && 'max-h-64 w-auto',
        )}
      />

      {/* // XXX: Alt render, as a background
      <div
        className={cn(
          isDev && '__WelcomeVisualBlock:Art', // DEBUG
          'bg-contain',
          'bg-center',
          'bg-no-repeat',
        )}
        style={{
          // minHeight: '40vw',
          minHeight: '50vh',
          backgroundImage: 'url(/static/arts/login-blue.svg)',
        }}
      />
      */}

      <SmallIntroText />
    </div>
  );
}
