import { MainNavItem } from '@/shared/types/site/NavItem';

export type SiteMenu = {
  mainNav: MainNavItem[];
};

export const siteMenu: SiteMenu = {
  mainNav: [
    {
      titleId: 'documentation',
      href: '/documentation',
    },
  ],
};
