import { TFetchParentId, TRecordWithChildrenOrCount } from './TRecord';

export type TGenericFetchRecordsByParent = (
  parentId: TFetchParentId,
) => Promise<TRecordWithChildrenOrCount[]>;
