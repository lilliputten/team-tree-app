import { TRecord } from '@/features/records/types';

interface TRecordsListProps {
  records: TRecord[];
}

export function RecordsList(props: TRecordsListProps) {
  const { records } = props;
  return (
    <div>
      <div className="__RecordsList">Records:</div>
      <ul>
        {records.map(({ id, name }) => {
          return (
            <li key={id}>
              {id}: {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
