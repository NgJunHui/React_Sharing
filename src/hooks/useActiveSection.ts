import { useEffect, useState } from 'react';

export interface ActiveIds {
  /** Top level section currently nearest the top of the viewport. */
  sectionId: string;
  /** Sub heading within that section, if one has been passed. */
  subId: string | null;
}

/**
 * Returns the section and sub heading the reader is currently on.
 *
 * A small custom hook: stateful logic with no UI of its own, reusable by
 * any component that needs to know where the reader is.
 */
export function useActiveSection(
  sectionIds: string[],
  subIds: string[],
  offset = 120,
): ActiveIds {
  const [active, setActive] = useState<ActiveIds>({
    sectionId: sectionIds[0] ?? '',
    subId: null,
  });

  useEffect(() => {
    let frame = 0;

    const nearestAbove = (ids: string[]): string | null => {
      let found: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) found = id;
      }
      return found;
    };

    const update = () => {
      frame = 0;

      // Bottom of the page: force the last section so short final
      // sections are always reachable in the nav.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;

      const sectionId = atBottom
        ? sectionIds[sectionIds.length - 1]
        : (nearestAbove(sectionIds) ?? sectionIds[0]);

      // Only consider sub headings that belong to the active section.
      const section = document.getElementById(sectionId);
      const ownSubs = section
        ? subIds.filter((id) => section.contains(document.getElementById(id)))
        : [];

      setActive((prev) => {
        const subId = nearestAbove(ownSubs);
        if (prev.sectionId === sectionId && prev.subId === subId) return prev;
        return { sectionId, subId };
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Cleanup: runs on unmount and before the effect re-runs.
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds, subIds, offset]);

  return active;
}
