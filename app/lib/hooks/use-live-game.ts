import { useState, useEffect } from "react";
import { getLiveGame } from "@/app/_actions";
import type { LiveGameType } from "@/app/types";
import startViewTransitionWrapper from "../start-view-transition-wrapper";

export function useLiveGame(id: number, status: string, interval = 60000) {
  const [data, setData] = useState<LiveGameType | null>(null);

  useEffect(() => {
    if (status !== "Live") return;
    // todo How would I add an AbortController to this hook to cancel the request if the component unmounts?
    let ignore = false;

    const fetchGame = () => {
      getLiveGame(String(id))
        .then((result) => {
          if (!ignore && result.success) {
            startViewTransitionWrapper(() => setData(result.data));
          }
        })
        .catch((error) =>
          console.error("Failed to fetch live game data:", error),
        );
    };

    // Initial fetch
    fetchGame();

    // Poll periodically
    const timer = setInterval(fetchGame, interval);

    return () => {
      ignore = true;
      clearInterval(timer);
    };
  }, [id, status, interval]);

  return data;
}
