import type { ReactNode } from 'react';

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
  return (
    <>
      <input
        id={inputId}
        className={inputClass}
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        data-search-input
      />
      <div className={listClass} data-search-list>
        {children}
      </div>
    </>
  );
}
