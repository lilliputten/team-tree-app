import { Record } from '@prisma/client';

export type TRecord = Record;

export type TRecordId = TRecord['id'];

/** A parent record id for search.
 * - Numeric value: for any non-root records with this specific parent.
 * - `null`: for root records only.
 * - `undefined`: for all available records.
 */
export type TFetchParentId = TRecordId | null | undefined;

/** New record shouldn't contain id */
export type TRecordWithoutId = Omit<TRecord, 'id'>;
export type TNewRecord = { name: TRecord['name']; parentId: TRecord['parentId'] };
export type TNewOrExistingRecord = TNewRecord & { id?: TRecord['id'] };

export type TRecordWithChildren = TRecord & { children: TRecord[] };
export type TRecordWithChildrenCount = TRecord & { _count: { children: number } };
export type TRecordWithChildrenOrCount = TRecord & { children?: TRecord[] } & {
  _count?: { children: number };
};
