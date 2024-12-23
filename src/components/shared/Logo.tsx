import Image from 'next/image';

import { TPropsWithClassName } from '@/shared/types/generic';

interface TProps extends TPropsWithClassName {
  // size?: TLogoSize;
}

const logoSize = 36;

const logoWhiteSrc = '/static/logo/LogoWhite-min.svg';

export function Logo(props: TProps) {
  const { className } = props;
  const src = logoWhiteSrc;
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
