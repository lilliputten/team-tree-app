import { TPropsWithClassName } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';

export function DemoList(props: TPropsWithClassName & { count?: number }) {
  const { className, count = 10 } = props;
  const items = Array.from(Array(count)).map((_none, no) => {
    const key = String(no);
    return <li key={key}>Item {no + 1}</li>;
  });
  return (
    <ScrollArea
      className={cn(
        '__RootPage_DemoList', // DEBUG
        className,
        'flex flex-col',
        'layout-follow',
        // 'py-4',
      )}
    >
      <h3>List:</h3>
      <ul>{items}</ul>
    </ScrollArea>
  );
}