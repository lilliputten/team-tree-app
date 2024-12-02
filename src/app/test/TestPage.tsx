import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/utils';

export const pageTitle = 'Test';
export const pageDescription = 'Test page';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

export async function TestPage() {
  return <div>Ok</div>;
}
