import { Icons } from '@/components/shared/icons';

export type NavItem = {
  titleId: string; // Id for i18n
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  // authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;
