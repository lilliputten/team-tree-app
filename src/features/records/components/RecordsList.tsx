import { TRecordWithChildrenOrCount } from '@/features/records/types';

import { RecordItem } from './RecordItem';

interface TRecordsListProps {
  initialRecords: TRecordWithChildrenOrCount[];
}

export function RecordsList(props: TRecordsListProps) {
  const { initialRecords } = props;
  return (
    <div>
      <div className="__RecordsList">Records:</div>
      <ul>
        {initialRecords.map((record) => {
          return <RecordItem key={record.id} record={record} />;
        })}
      </ul>
    </div>
  );
}
