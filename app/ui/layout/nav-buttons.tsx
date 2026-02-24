"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  TrophyIcon,
  NumberedListIcon,
  CalendarIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import {
  TrophyIcon as TrophyIconSolid,
  NumberedListIcon as NumberedListIconSolid,
  CalendarIcon as CalendarIconSolid,
  GlobeEuropeAfricaIcon as GlobeEuropeAfricaIconSolid,
} from "@heroicons/react/24/solid";
const NavButtons = () => {
  const pathname = usePathname();

  const buttons = [
    {
      name: "Standings",
      href: "/standings",
      icon: NumberedListIcon,
      iconSolid: NumberedListIconSolid,
    },
    {
      name: "Schedule",
      href: "/schedule",
      icon: CalendarIcon,
      iconSolid: CalendarIconSolid,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: TrophyIcon,
      iconSolid: TrophyIconSolid,
    },
    {
      name: "Playoffs",
      href: "/playoffs",
      icon: GlobeEuropeAfricaIcon,
      iconSolid: GlobeEuropeAfricaIconSolid,
    },
  ];

  return (
    <>
      <Link
        href={"/"}
        className="flex flex-row items-center cursor-pointer group w-max shrink-0 mr-auto"
      >
        <span className="text-xl bg-stone-300 dark:bg-stone-700 p-1 ml rounded">
          🏒
        </span>
        <h1
          className={`flex flex-row items-center cursor-pointer 
            md:text-xl font-bold text-stone-600 dark:text-stone-200 
            group-hover:text-stone-900 dark:group-hover:text-white mb-[-2px] ml-1
             ${
               pathname === "/" &&
               "border-stone-900 border-stone-900 dark:border-white text-stone-900 dark:text-white "
             }`}
        >
          NHL Stats
        </h1>
      </Link>
      <ul
        className="fixed bottom-0 left-0 z-2 bg-gray-100 dark:bg-stone-800
      border-t-1 md:border-t-0 border-stone-300 dark:border-stone-700 md:bg-transparent md:dark:bg-transparent 
    p-2 md:p-0 md:static flex flex-row justify-around md:justify-end w-full 
   gap-2 md:gap-5 leading-tight tracking-wide select-none"
      >
        {buttons.map((button) => (
          <li
            key={button.name}
            className="flex flex-row items-center justify-center"
          >
            <Link
              href={button.href}
              className={`flex flex-col md:flex-row items-center justify-center cursor-pointer 
            text-sm sm:text-base md:text-xl font-bold text-stone-600 dark:text-stone-200 
            hover:text-stone-900 dark:hover:text-white mb-[-2px]
             ${
               pathname === button.href &&
               "underline border-stone-900 border-stone-900 dark:border-white text-stone-900 dark:text-white"
             }`}
            >
              {pathname === button.href ? (
                <button.iconSolid className="h-6 w-6" />
              ) : (
                <button.icon className="h-6 w-6" />
              )}
              <p className="md:ml-1">{button.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavButtons;
