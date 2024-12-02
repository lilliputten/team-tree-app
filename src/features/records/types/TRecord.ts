import { PartialBy } from '@/lib/ts';

export type TRecordId = number;

export interface TRecord {
  id: TRecordId;
  name: string;
  parentId?: TRecordId | null;
}

export type TNewRecord = PartialBy<TRecord, 'id'>;
