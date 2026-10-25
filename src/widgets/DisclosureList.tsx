import { CardIcon } from './Icon.tsx';
import type { ExplorerRecord } from './RecordExplorer.tsx';

export default function DisclosureList({
  records,
  className = '',
}: {
  records: ExplorerRecord[];
  className?: string;
}) {
  return (
    <div className={`disclosure-list ${className}`.trim()} data-disclosure-group>
      {records.map((record, index) => (
        <details
          key={record.id}
          id={record.id}
          className="disclosure-record"
          open={index === 0}
          {...{ 'data-category': record.category }}
        >
          <summary>
            <CardIcon name={record.icon} />
            <span className="disclosure-record__intro">
              {record.tag && <span className="card-tag">{record.tag}</span>}
              <span className="disclosure-record__title">{record.title}</span>
            </span>
            <span className="observation-model__toggle" aria-hidden="true" />
          </summary>
          <div className="disclosure-record__body">
            <p className="muted">{record.description}</p>
            {record.meta && (
              <div className="application-meta">
                {record.meta.map((item) => <span key={item}>{item}</span>)}
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
