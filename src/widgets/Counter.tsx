import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../hooks.ts';

/*
 * A figure that counts up when it scrolls into view.
 *
 * The children are the finished value, and they are what the server renders.
 * With JavaScript switched off, or before the observer fires, the reader sees
 * "3" and "24/7" — never an empty box. That is the property main.js did not
 * have and the reason this is a component rather than a script that rewrites
 * textContent on load.
 */
export default function Counter({
  target,
  suffix = '',
  duration = 1000,
  children,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          obs.unobserve(entry.target);
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = `${Math.round(target * progress)}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.55 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, reduced, suffix, target]);

  // Only the number is ever replaced, so a unit rendered beside it survives.
  return <strong ref={ref}>{children}</strong>;
}
