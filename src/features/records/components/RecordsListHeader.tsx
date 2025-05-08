'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { isDev } from '@/constants';

interface TRecordsListHeaderProps extends TPropsWithClassName {
  handleReloadRecords: () => void;
  isUpdating?: boolean;
  handleRootAdd: () => void;
}

export function RecordsListHeader(props: TRecordsListHeaderProps) {
  const t = useTranslations('RecordsListHeader');
  const { className, handleReloadRecords, isUpdating, handleRootAdd } = props;
  const rightIcons = React.useMemo(() => {
    return (
      <>
        <Button
          title={t('add-new-top-level-record')}
          data-button-id="add"
          variant="ghostBlue"
          className="text-green-500 hover:bg-green-400/10 hover:text-green-700 active:bg-green-500 active:text-green-100"
          size="icon"
          onClick={handleRootAdd}
        >
          <Icons.add className="size-7" />
        </Button>
        <Button
          title={t('refresh-data')}
          data-button-id="add"
          variant="ghostBlue"
          className="text-blue-500 hover:bg-blue-400/10 hover:text-blue-700 active:bg-blue-500 active:text-blue-100"
          size="icon"
          onClick={handleReloadRecords}
        >
          <Icons.refresh className={cn('size-7', isUpdating && 'animate-spin')} />
        </Button>
      </>
    );
  }, [handleReloadRecords, handleRootAdd, isUpdating, t]);
  return (
    <div
      className={cn(
        isDev && '__RecordsListHeader', // DEBUG
        className,
        'flex flex-row items-center gap-0',
        'p-2',
      )}
    >
      <div
        className={cn(
          isDev && '__RecordsListHeader_Text', // DEBUG
          'flex-1',
          'opacity-20',
          'select-none',
        )}
      >
        {t('editor-statistics-coming-here')}
      </div>
      <div
        className={cn(
          isDev && '__RecordsListHeader_RightIcons', // DEBUG
          'flex flex-row items-center gap-0 py-0',
          isUpdating && 'opacity-50',
          isUpdating && 'cursor-not-allowed',
          isUpdating && 'pointer-events-none',
          'justify-end',
          // 'max-sm:w-full', // NOTE: Align controls to the right on small screens
        )}
      >
        {rightIcons}
      </div>
    </div>
  );
}
