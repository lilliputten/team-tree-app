'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { isDev } from '@/constants';

export function SmallIntroText(props: TPropsWithClassName) {
  const t = useTranslations('SmallIntroText');
  const { className } = props;
  return (
    <div
      className={cn(
        isDev && '__IntroText', // DEBUG
        className,
        'gap-4',
        'text-content',
        'text-center', // Only for small texts
      )}
    >
      <h1>{t('title')}</h1>
      {t.rich('content', {
        p: (chunks) => <p>{chunks}</p>,
        infolink: (chunks) => <Link href="/info">{chunks}</Link>,
      })}
    </div>
  );
}
