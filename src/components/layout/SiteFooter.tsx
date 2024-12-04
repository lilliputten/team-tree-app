import { siteConfig } from '@/config/site';
import { commonXPaddingTwStyle } from '@/config/ui';
import { cn } from '@/lib/utils';
import { MaxWidthWrapper } from '@/components/shared/MaxWidthWrapper';

interface SiteFooterProps {
  large?: boolean;
}
export function SiteFooter(props: SiteFooterProps) {
  const { large } = props;
  return (
    <div
      className={cn(
        '__SiteFooter', // DEBUG
        'flex',
        'w-full',
        'bg-muted',
        commonXPaddingTwStyle,
        'justify-center',
      )}
    >
      <MaxWidthWrapper
        className={cn(
          'flex',
          'justify-between',
          'py-1',
          'z-10',
          'opacity-50',
          'flex-col',
          'items-center',
          'sm:flex-row',
        )}
        large={large}
      >
        <div className="font-normal">{siteConfig.name}</div>
        <div className="text-xs">{siteConfig.versionInfo}</div>
      </MaxWidthWrapper>
    </div>
  );
}
