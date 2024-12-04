import { MainNavItem } from '@/shared/types/site/NavItem';

export type SiteMenu = {
  mainNav: MainNavItem[];
};

export const siteMenu: SiteMenu = {
  mainNav: [
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
};
