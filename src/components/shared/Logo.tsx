import Image from 'next/image';

import { TPropsWithClassName } from '@/shared/types/generic';

// type TLogoSize = 'md' | 'sm' | 'lg';
// const defaultSize: TLogoSize = 'sm';

interface TProps extends TPropsWithClassName {
  // size?: TLogoSize;
}

const logoSize = 36;

// const sources: Record<TLogoSize, string> = {
//   sm: '/static/logo/sm-super-simple.svg',
//   md: '/static/logo/sm-tr-sq-no-details.svg',
//   lg: '/static/logo/tr.svg',
// };

const logoWhiteSrc = '/static/logo/LogoWhite-min.svg';

export function Logo(props: TProps) {
  const {
    className,
    // size = defaultSize,
  } = props;
  const src = logoWhiteSrc; // sources[size];
  return (
    <Image
      // prettier-ignore
      src={src}
      className={className}
      width={logoSize}
      height={logoSize}
      alt="Logo"
    />
  );
}
