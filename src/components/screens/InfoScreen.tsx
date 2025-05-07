'use client';

import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { InfoVisualBlock } from '@/components/blocks/InfoVisualBlock';
import { IntroText } from '@/components/screens/IntroText';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { isDev } from '@/constants';

export function InfoScreen(props: TPropsWithClassName) {
  const { className } = props;

  return (
    <div
      className={cn(
        isDev && '__InfoScreen', // DEBUG
        className,
        'flex flex-1 flex-col items-center',
        'justify-center', // Content in the middle of the page
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <ScrollArea
        className={cn(
          isDev && '__InfoScreen:Container', // DEBUG
          'flex flex-col items-center',
          'justify-center', // Content in the middle of the page
          'layout-follow',
          commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            isDev && '__InfoScreen:MaxWidthWrapper', // DEBUG
            'flex flex-col',
            'm-auto',
            'py-4',
            'gap-4',
          )}
        >
          <div
            className={cn(
              isDev && '__InfoScreen:Container', // DEBUG
              'flex flex-col',
              'm-auto',
              'py-4',
              'gap-4',
            )}
          >
            <InfoVisualBlock />
            <IntroText
              className={cn(
                isDev && '__InfoScreen:Content', // DEBUG
              )}
            />
          </div>
        </MaxWidthWrapper>
      </ScrollArea>
    </div>
  );
}
