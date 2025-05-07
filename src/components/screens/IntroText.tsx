'use client';

import { useTranslations } from 'next-intl';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { isDev } from '@/constants';

export function IntroText(props: TPropsWithClassName) {
  const t = useTranslations('IntroText');
  const { className } = props;
  return (
    <div
      className={cn(
        isDev && '__IntroText', // DEBUG
        className,
        'text-content',
        'gap-4',
        'text-center', // Only for small texts
      )}
    >
      <h1>{t('title')}</h1>
      {t.rich('content', {
        p: (chunks) => <p>{chunks}</p>,
      })}
    </div>
  );
}
