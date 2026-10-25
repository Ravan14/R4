import type { ReactNode } from 'react';

/* Static markup for the progressively enhanced filters in src/client.ts. */

export type Filter = { value: string; label: string };

export default function FilterGrid({
  filters,
  categoryAttr,
  toolbarClass,
  toolbarLabel,
  gridClass,
  allLabel,
  children,
}: {
  filters: Filter[];
  /** The attribute on each card that names its category or categories. */
  categoryAttr: 'data-category' | 'data-career-category';
  toolbarClass: string;
  toolbarLabel?: string;
  gridClass: string;
  /** The value that means "show everything"; matches main.js's 'all'. */
  allLabel?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className={toolbarClass} aria-label={toolbarLabel} data-filter-toolbar>
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            className={f.value === filters[0]?.value ? 'filter-btn active' : 'filter-btn'}
            aria-pressed={f.value === filters[0]?.value}
            data-filter-value={f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={gridClass} data-filter-grid data-category-attr={categoryAttr} data-all-label={allLabel ?? 'all'}>
        {children}
      </div>
    </>
  );
}
