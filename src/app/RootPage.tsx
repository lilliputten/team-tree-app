import { TPropsWithClassName } from '@/shared/types/generic';
import { siteConfig } from '@/config/site';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn, constructMetadata } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';

export const pageTitle = 'Editor';
export const pageDescription = 'Editor page';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

function DemoList(props: TPropsWithClassName) {
  const { className } = props;
  const itemsCount = 50;
  const items = Array.from(Array(itemsCount)).map((_none, no) => {
    const key = String(no);
    return <li key={key}>Item {no + 1}</li>;
  });
  return (
    <ScrollArea
      className={cn(
        '__RootPage_DemoList', // DEBUG
        className,
        'flex flex-col',
        'layout-follow',
        // 'py-4',
      )}
    >
      <h3>List:</h3>
      <ul>{items}</ul>
    </ScrollArea>
  );
}

export function RootPage() {
  return (
    <div
      className={cn(
        '__RootPage', // DEBUG
        'flex flex-col',
        'items-center',
        'layout-follow',
        commonXPaddingTwStyle,
        // 'py-4',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <MaxWidthWrapper
        className={cn(
          '__RootPage_Wrapper', // DEBUG
          'flex flex-col',
          // 'items-center',
          'layout-follow',
        )}
      >
        <h1
          className={cn(
            'my-4',
            'text-3xl',
            'font-heading',
            // 'font-extrabold',
            // 'leading-none',
            // 'tracking-tight',
            'text-gray-500',
            'dark:text-white',
            'md:text-4xl',
            'lg:text-5xl',
            // commonXPaddingTwStyle,
          )}
        >
          ПРОБА Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <DemoList />
      </MaxWidthWrapper>
    </div>
  );
}
