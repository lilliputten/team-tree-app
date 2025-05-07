import Image from 'next/image';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { isDev } from '@/constants';

import svgArt from './assets/data-blue.svg';

export function InfoVisualBlock(props: TPropsWithClassName) {
  const { className } = props;
  return (
    <div
      className={cn(
        isDev && '__InfoVisualBlock', // DEBUG
        className,
        // 'm-4',
        'gap-4',
        'flex flex-1 flex-col',
        'items-stretch',
        'justify-center', // Content in the middle of the page
      )}
    >
      <Image
        // priority
        src={svgArt}
        alt="Data illustration"
      />
      {/*
      <div
        className={cn(
          isDev && '__InfoVisualBlock:Art', // DEBUG
          className,
          'flex flex-col',
          'items-center',
          'justify-center', // Content in the middle of the page
          'bg-contain',
          'bg-center',
          'bg-no-repeat',
          // 'min-h-40',
        )}
        style={{
          minHeight: '30vh',
          backgroundImage: 'url(/static/arts/data-blue.svg)',
        }}
      />
      <div
        className={cn(
          isDev && '__InfoVisualBlock:Content', // DEBUG
          className,
          'flex flex-col',
          'items-center',
          'justify-center', // Content in the middle of the page
        )}
      >
        Info Info Block
      </div>
      */}
    </div>
  );
}
