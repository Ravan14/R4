import { useEffect, useState } from 'react';

/** True once the window has scrolled past `threshold`. Mirrors the single
 *  passive scroll listener the old main.js used for both the header state and
 *  the back-to-top button. */
export function useScrollPast(threshold: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return past;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/** Calls onClose whenever a pointerdown lands outside the returned ref.
 *  Replaces the document-level click handler in main.js. */
export function useClickOutside<T extends HTMLElement>(
  onClose: () => void,
  active: boolean,
) {
  const [node, setNode] = useState<T | null>(null);
  useEffect(() => {
    if (!active || !node) return;
    const onDown = (event: PointerEvent) => {
      if (!node.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [node, onClose, active]);
  return setNode;
}
