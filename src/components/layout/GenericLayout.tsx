import '@/styles/globals.scss';
import '@/styles/root.scss';

import { useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { TPropsWithChildren } from '@/shared/types/generic';
import { NavBar } from '@/components/layout/NavBar';
import { NavMobile } from '@/components/layout/NavMobile';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { TLocale } from '@/i18n/types';

export function GenericLayout(props: TPropsWithChildren) {
  const { children } = props;
  const defaultLocale = useLocale();
  const locale = defaultLocale as TLocale;
  setRequestLocale(locale);
  return (
    <>
      <NavMobile />
      <NavBar />
      {children}
      <SiteFooter />
    </>
  );
}
