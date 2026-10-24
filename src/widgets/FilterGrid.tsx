import { Children, cloneElement, useState, type ReactElement, type ReactNode } from 'react';

/*
 * A filter bar and the grid it filters, in one component that owns the open
 * state. Before this, main.js queried [data-application-filter] and set
 * card.hidden imperatively; now the grid re-renders and the hidden attribute
 * is a prop. Same result, and the visible subset is now whatever React thinks
 * it is rather than whatever the last click left the DOM as.
 *
 * The cards stay in the page file as prose. Only the toolbar and the state
 * move here, because moving nine cards and twelve roles into a data array
 * would be a rewrite of content that was not up for rewriting.
 */

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
  const [active, setActive] = useState<string>(filters[0]?.value ?? 'all');
  const showAll = active === (allLabel ?? 'all');

  const cards = Children.toArray(children).filter(
    (c): c is ReactElement<{ [k: string]: unknown }> =>
      typeof c === 'object' && c !== null && 'props' in c,
  );

  return (
    <>
      <div className={toolbarClass} aria-label={toolbarLabel}>
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            className={f.value === active ? 'filter-btn active' : 'filter-btn'}
            aria-pressed={f.value === active}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={gridClass}>
        {cards.map((card, i) => {
          const raw = String(card.props[categoryAttr] ?? '');
          // Application cards carry a space-separated list; role cards one value.
          const isMatch = raw.split(' ').includes(active);
          return showAll || isMatch ? (
            card
          ) : (
            cloneElement(card, { key: i, hidden: true })
          );
        })}
      </div>
    </>
  );
}
