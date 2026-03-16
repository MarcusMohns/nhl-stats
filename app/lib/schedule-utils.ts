import type { GameWeekType, GameType } from "@/app/types";

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const fetchSchedule = async (): Promise<GameWeekType[]> => {
  const scheduleUrl = "https://api-web.nhle.com/v1/schedule/now";

  try {
    const response = await fetch(scheduleUrl, {
      // Cache the data for 1 minute server side
      next: { revalidate: 60 },
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const data = (await response.json()) as { gameWeek: GameWeekType[] };
    return data.gameWeek;
  } catch (e) {
    console.error("Error fetching schedule data from API", e);
    throw new Error("Error fetching data from the server ☹️");
  }
};

export const utcToReadableDate = (utc: string) => {
  const date = new Date(utc);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  // Use undefined to get the default locale
  return new Intl.DateTimeFormat(undefined, options).format(date);
};

export const groupGamesByLocalDate = (schedule: GameWeekType[]) => {
  // Group games by local date (based on the startTimeUTC inside the game, converted to local time)
  const groupedGames = schedule
    .flatMap((day) => day.games)
    .reduce(
      (acc, game) => {
        const gameDate = new Date(game.startTimeUTC);
        const year = gameDate.getFullYear();
        const month = String(gameDate.getMonth() + 1).padStart(2, "0");
        const day = String(gameDate.getDate()).padStart(2, "0");
        const localDateKey = `${year}-${month}-${day}`;

        if (!acc[localDateKey]) {
          // initialize the array for this date if it doesn't exist
          acc[localDateKey] = [];
        }
        acc[localDateKey].push({
          // add the game to the array for this date, along with the local start time
          ...game,
          localStartTime: gameDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        return acc;
      },
      {} as Record<string, (GameType & { localStartTime: string })[]>,
    );

  return (
    Object.entries(groupedGames)
      // Sort the entries by date
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, games]) => ({
        date: utcToReadableDate(date),
        games,
      }))
  );
};
