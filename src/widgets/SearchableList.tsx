import { Children, cloneElement, useState, type ReactElement, type ReactNode } from 'react';

/*
 * The FAQ filter box. main.js read item.textContent after render; here the
 * searchable string is walked out of the React tree instead, so the component
 * stays pure and the answer to "does this match?" depends only on its children.
 */

/** Collect every text node a subtree will render, the way textContent would. */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  if (typeof node === 'object' && 'props' in node) {
    const props = (node as ReactElement<{ children?: ReactNode }>).props;
    return textOf(props.children);
  }
  return '';
}

export default function SearchableList({
  inputId,
  inputClass,
  placeholder,
  ariaLabel,
  listClass,
  children,
}: {
  inputId: string;
  inputClass: string;
  placeholder: string;
  ariaLabel: string;
  listClass: string;
  children: ReactNode;
}) {
  const [query, setQuery] = useState('');
  const items = Children.toArray(children).filter(
    (c): c is ReactElement<{ hidden?: boolean }> =>
      typeof c === 'object' && c !== null && 'props' in c,
  );
  const needle = query.trim().toLowerCase();

  return (
    <>
      <input
        id={inputId}
        className={inputClass}
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={listClass}>
        {items.map((item, i) =>
          needle && !textOf(item).toLowerCase().includes(needle) ? (
            cloneElement(item, { key: i, hidden: true })
          ) : (
            item
          ),
        )}
      </div>
    </>
  );
}
