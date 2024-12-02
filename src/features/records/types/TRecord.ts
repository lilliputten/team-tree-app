import { Record } from '@prisma/client';

export type TRecord = Record;

export type TRecordId = TRecord['id'];

/** New record shouldn't contain id */
export type TRecordWithoutId = Omit<TRecord, 'id'>;
