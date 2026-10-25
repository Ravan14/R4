import type { Filter } from './FilterGrid.tsx';
import Icon, { CardIcon, type IconName } from './Icon.tsx';

export type ExplorerRecord = {
  id: string;
  category: string;
  icon: IconName;
  tag?: string;
  title: string;
  description: string;
  meta?: string[];
};

export default function RecordExplorer({
  records,
  filters,
  categoryAttr,
  label,
  variant,
}: {
  records: ExplorerRecord[];
  filters: Filter[];
  categoryAttr: 'data-category' | 'data-career-category';
  label: string;
  variant: 'missions' | 'roles';
}) {
  return (
    <div
      className={`record-explorer record-explorer--${variant}`}
      data-explorer
      data-category-attr={categoryAttr}
      data-all-label="all"
    >
      <div className="application-toolbar" aria-label={`${label} filters`} data-explorer-filters>
        {filters.map((filter, index) => (
          <button
            key={filter.value}
            type="button"
            className={index === 0 ? 'filter-btn active' : 'filter-btn'}
            aria-pressed={index === 0}
            data-filter-value={filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="explorer-workspace">
        <div className="explorer-index" role="tablist" aria-label={label}>
          {records.map((record, index) => (
            <button
              key={record.id}
              id={`${record.id}-tab`}
              type="button"
              role="tab"
              aria-selected={index === 0}
              aria-controls={record.id}
              tabIndex={index === 0 ? 0 : -1}
              className="explorer-select"
              data-explorer-target={record.id}
              {...{ [categoryAttr]: record.category }}
            >
              <CardIcon name={record.icon} />
              <span className="explorer-select__copy">
                {record.tag && <span className="card-tag">{record.tag}</span>}
                <strong>{record.title}</strong>
              </span>
              <span className="explorer-select__marker" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="explorer-panels">
          {records.map((record, index) => (
            <article
              key={record.id}
              id={record.id}
              className="explorer-panel"
              role="tabpanel"
              aria-labelledby={`${record.id}-tab`}
              data-explorer-panel
              {...{ [categoryAttr]: record.category }}
            >
              {variant === 'missions' && (
                <div className="mission-preview" aria-hidden="true">
                  <span className="mission-preview__orbit" />
                  <span className="mission-preview__crosshair" />
                  <Icon name={record.icon} />
                  <span className="mission-preview__scan" />
                </div>
              )}
              <div className="explorer-panel__copy">
                {record.tag && <span className="card-tag">{record.tag}</span>}
                <h3>{record.title}</h3>
                <p className="muted">{record.description}</p>
                {record.meta && (
                  <div className="application-meta">
                    {record.meta.map((item) => <span key={item}>{item}</span>)}
                  </div>
                )}
              </div>
              {index === 0 && <span className="explorer-panel__anchor" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
