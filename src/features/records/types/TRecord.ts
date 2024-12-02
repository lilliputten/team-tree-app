import { Record } from '@prisma/client';

import { PartialBy } from '@/lib/ts';

export type TRecord = Record;

export type TRecordId = TRecord['id'];

/** New record shouldn't contain id */
export type TRecordWithoutId = PartialBy<TRecord, 'id'>;
