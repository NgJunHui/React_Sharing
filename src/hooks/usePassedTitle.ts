import { useEffect, useState } from 'react';

/** Height of the sticky bar, so a title is only "passed" once truly hidden. */
const BAR_HEIGHT = 72;

/**
 * Tracks whether the reader has scrolled past a section's own <h2>, and
 * returns the id of the last title passed.
 *
 * Uses IntersectionObserver rather than a scroll listener, so the browser
 * reports visibility changes instead of us measuring on every frame.
 *
 * The observer root is the viewport minus the strip the bar occupies. A
 * title is "passed" when it is no longer intersecting that region and sits
 * above it, which is exactly when the bar should take over naming the
 * section.
 */
export function usePassedTitle(titleIds: string[]): string | null {
  const [passedId, setPassedId] = useState<string | null>(null);

  useEffect(() => {
    if (titleIds.length === 0) return;

    const elements = titleIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    /**
     * Reads every heading's position and picks the last one above the bar.
     * Cheap: a handful of headings, and only called when the observer
     * reports a change rather than on every scroll frame.
     */
    const recompute = () => {
      let latest: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().bottom <= BAR_HEIGHT) {
          latest = el.id;
        }
      }
      setPassedId((prev) => (prev === latest ? prev : latest));
    };

    const observer = new IntersectionObserver(recompute, {
      // Trigger as headings cross the band the bar sits in.
      rootMargin: `-${BAR_HEIGHT}px 0px 0px 0px`,
      threshold: [0, 1],
    });

    for (const el of elements) observer.observe(el);

    // Covers a reload partway down the page, where no crossing occurs.
    recompute();

    return () => observer.disconnect();
  }, [titleIds]);

  return passedId;
}
