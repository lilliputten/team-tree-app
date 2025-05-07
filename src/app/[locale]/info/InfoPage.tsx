import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { cn, constructMetadata } from '@/lib/utils';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';
import { UseScrollableLayout } from '@/components/shared/ScrollableLayout';
import { TAwaitedLocaleProps } from '@/i18n/types';

export async function generateMetadata({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'InfoPage' });
  return constructMetadata({
    title: t('title'),
    locale,
  });
}

function SampleContent() {
  const t = useTranslations('InfoPage');
  return (
    <>
      {t.rich('description', {
        p: (chunks) => <p className="mt-4">{chunks}</p>,
        code: (chunks) => <code className="font-mono">{chunks}</code>,
      })}
    </>
  );
}

export async function InfoPage({ params }: TAwaitedLocaleProps) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <div
      className={cn(
        '__InfoPage', // DEBUG
        'justify-center',
        'flex flex-1 flex-col',
        'layout-follow',
      )}
    >
      <UseScrollableLayout type="clippable" />
      <ScrollArea
        className={cn(
          '__InfoPage_Scroll', // DEBUG
          'flex flex-col',
          'items-center',
          'layout-follow',
          // commonXPaddingTwStyle,
        )}
      >
        <MaxWidthWrapper
          className={cn(
            '__InfoPage_Container', // DEBUG
            'flex flex-col',
            'layout-follow',
            'm-auto',
            'my-3',
            'mx-3',
            // isUpdating && 'opacity-50',
            // isUpdating && 'cursor-not-allowed',
            // isUpdating && 'pointer-events-none',
            'transition-all',
          )}
        >
          <div
            className={cn(
              '__InfoPage_Content', // DEBUG
              'm-auto',
              'p-4',
              'flex flex-col gap-4',
            )}
          >
            <SampleContent />
          </div>
        </MaxWidthWrapper>
      </ScrollArea>
    </div>
  );
}
