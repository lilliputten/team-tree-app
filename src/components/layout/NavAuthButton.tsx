'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { TLocale } from '@/i18n/types';

import { Skeleton } from '../ui/skeleton';

interface TNavAuthButtonProps extends TPropsWithClassName {
  onPrimary?: boolean;
}

export function NavAuthButton(props: TNavAuthButtonProps) {
  const { onPrimary, className } = props;
  const { data: session, status } = useSession();
  const t = useTranslations('NavAuthButton');

  // // NOTE: This one doesn't change on real locale change
  // const locale = useLocale();
  // const pathname = usePathname();
  // const router = useRouter();
  // const params = useParams();

  return <Skeleton className="h-9 w-28 rounded-full lg:flex" />;
}
