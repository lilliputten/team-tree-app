import { MainNavItem } from '@/shared/types/site/NavItem';

export type SiteMenu = {
  mainNav: MainNavItem[];
};

export const siteMenu: SiteMenu = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
};
