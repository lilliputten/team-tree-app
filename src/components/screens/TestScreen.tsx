import { TPropsWithClassName } from '@/shared/types/generic';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { DemoList } from '@/components/debug/DemoList';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { isDev } from '@/constants';

export function TestScreen(props: TPropsWithClassName) {
  const { className } = props;
  return (
    <div
      className={cn(
        isDev && '__TestScreen', // DEBUG
        className,
        'flex flex-1 flex-col items-center',
        'justify-center',
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <ScrollArea
        className={cn(
          isDev && '__TestScreen:Container', // DEBUG
          'flex flex-col items-center',
          'justify-center',
          'layout-follow',
          commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            isDev && '__TestScreen:MaxWidthWrapper', // DEBUG
            'flex flex-col',
            'layout-follow',
            'm-auto',
          )}
        >
          <h2>Test Screen</h2>
          <DemoList count={50} />
        </MaxWidthWrapper>
      </ScrollArea>
    </div>
  );
}
