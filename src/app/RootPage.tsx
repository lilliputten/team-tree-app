import { TPropsWithClassName } from '@/shared/types/generic';
import { siteConfig } from '@/config/site';
import { tailwindClippingLayout } from '@/lib/helpers/tailwind';
import { cn, constructMetadata } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <ScrollArea className={cn('__RootPage_DemoList', className, tailwindClippingLayout())}>
      <h3>List:</h3>
      <ul>{items}</ul>
    </ScrollArea>
  );
}

export function RootPage() {
  return (
    <div className={cn('__RootPage', tailwindClippingLayout())}>
      <UseScrollableLayout type="clippable" />
      <h1
        className={cn(
          'mb-4',
          'text-4xl',
          'font-heading',
          // 'font-extrabold',
          // 'leading-none',
          // 'tracking-tight',
          'text-gray-500',
          'dark:text-white',
          'md:text-5xl',
          'lg:text-6xl',
        )}
      >
        ПРОБА Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <DemoList />
    </div>
  );
}
