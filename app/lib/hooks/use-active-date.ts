import { useEffect, useState, useCallback, type RefObject } from "react";

type LocalScheduleItem = {
  date: string;
  games: { localStartTime: string }[];
};

export function useActiveDate(
  dateRefs: RefObject<Record<string, HTMLDivElement | null>>,
  localSchedule: LocalScheduleItem[],
) {
  const [activeDate, setActiveDate] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !dateRefs.current) return;

    const elements = Object.values(dateRefs.current).filter(
      // Filter out null values
      (el): el is HTMLDivElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      // Create IntersectionObserver
      () => {
        // Find the element closest to the center of the viewport and set it as the active date
        const viewportCenter = window.innerHeight / 2;

        const closest = elements.reduce(
          (acc, el) => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - viewportCenter);

            if (distance < acc.bestDistance) {
              return { bestDistance: distance, activeEl: el };
            }
            return acc;
          },
          { bestDistance: Infinity, activeEl: elements[0] as HTMLDivElement },
        );

        let activeEl = closest.activeEl;

        // If we're at the top of the page, set the active date to the first element regardless
        const firstElRect = elements[0].getBoundingClientRect();
        if (firstElRect.top > 0 && firstElRect.top < viewportCenter) {
          activeEl = elements[0];
        }

        // Set the active date
        if (activeEl) {
          const newActiveDate = activeEl.id.replace("date-", "");
          setActiveDate(newActiveDate);
        }
      },
      { root: null, threshold: [0, 0.5, 1] },
    );

    // Observe each element
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [localSchedule, dateRefs]);

  const scrollToDate = useCallback(
    // onClick to scroll to a specific ref (date)
    (date: string) => {
      const element = dateRefs.current?.[date];
      if (element) {
        const headerOffset = 80; // height of sticky header
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        setActiveDate(date);
      }
    },
    [dateRefs],
  );

  return { activeDate, scrollToDate };
}
