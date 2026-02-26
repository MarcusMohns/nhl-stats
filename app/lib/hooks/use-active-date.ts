import { useEffect, useState, useCallback } from "react";

type LocalScheduleItem = {
  date: string;
  games: { localStartTime: string }[];
};

export function useActiveDate(
  dateRefs: React.RefObject<Record<string, HTMLDivElement | null>>,
  localSchedule: LocalScheduleItem[],
) {
  const [activeDate, setActiveDate] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getDateElements = () =>
      // filter out nulls
      Object.values(dateRefs.current).filter(
        (el): el is HTMLDivElement => el !== null,
      );

    const elements = getDateElements();
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      // Create IntersectionObserver
      () => {
        const dateElements = getDateElements();
        if (dateElements.length === 0) return;

        // Find the element closest to the center of the viewport and set it as the active date
        const viewportCenter = window.innerHeight / 2;
        let activeEl: HTMLDivElement | null = null;
        let bestDistance = Infinity;

        dateElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < bestDistance) {
            bestDistance = distance;
            activeEl = el;
          }
        });

        // If we're at the top of the page, set the active date to the first element regardless
        const firstElRect = dateElements[0].getBoundingClientRect();
        if (firstElRect.top > 0 && firstElRect.top < viewportCenter) {
          activeEl = dateElements[0];
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
      const element = dateRefs.current[date];
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
