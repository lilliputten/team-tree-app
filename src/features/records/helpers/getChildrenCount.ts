import { TRecordWithChildrenOrCount } from '../types';

export function getChildrenCount(record: TRecordWithChildrenOrCount) {
  const {
    _count, // : { children: childrenCount },
    children,
  } = record;
  return children ? children.length : _count ? _count.children : 0;
}
