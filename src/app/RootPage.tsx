import { siteConfig } from '@/config/site';
import { cn, constructMetadata } from '@/lib/utils';

export const pageTitle = 'Editor';
export const pageDescription = 'Editor page';

export const metadata = constructMetadata({
  title: pageTitle + ' - ' + siteConfig.name,
  description: pageDescription,
});

export function RootPage() {
  return (
    <div
      className={cn(
        '__RootPage',
        // 'grid',
        // 'min-h-screen',
        // 'grid-rows-[20px_1fr_20px] items-center',
        // 'justify-items-center',
        // 'gap-16',
        // 'p-8',
        // 'pb-20',
        // 'font-[family-name:var(--font-sans)] sm:p-20',
      )}
    >
      <h1
        className={cn(
          'mb-4',
          'text-4xl',
          'font-heading',
          // 'font-extrabold',
          // 'leading-none',
          // 'tracking-tight',
          'text-gray-500',
          'dark:text-white',
          'md:text-5xl',
          'lg:text-6xl',
        )}
      >
        Тест Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </div>
  );
}
