"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import {
  TrophyIcon as TrophyIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  CalendarIcon as CalendarIconSolid,
  GlobeEuropeAfricaIcon as GlobeEuropeAfricaIconSolid,
} from "@heroicons/react/24/solid";

const buttons = [
  {
    name: "Standings",
    href: "/standings",
    icon: <ChartBarIcon className="w-6 h-6" />,
    iconSolid: (
      <ChartBarIconSolid className="w-6 h-6 text-orange-600 dark:text-orange-400" />
    ),
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: <CalendarIcon className="w-6 h-6" />,
    iconSolid: (
      <CalendarIconSolid className="w-6 h-6 text-green-600 dark:text-green-400" />
    ),
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: <GlobeEuropeAfricaIcon className="w-6 h-6" />,
    iconSolid: (
      <GlobeEuropeAfricaIconSolid className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    ),
  },
  {
    name: "Playoffs",
    href: "/playoffs",
    icon: <TrophyIcon className="w-6 h-6" />,

    iconSolid: (
      <TrophyIconSolid className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
    ),
  },
];

const NavButtons = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={"/"}
        aria-current={pathname === "/" ? "page" : undefined}
        className="flex flex-row items-center cursor-pointer group w-max shrink-0 mr-auto rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-stone-800"
      >
        <span
          aria-hidden="true"
          className="text-xl bg-stone-300 dark:bg-stone-700 p-1 mr-1 rounded"
        >
          🏒
        </span>
        <h1
          className={`flex flex-row items-center cursor-pointer lg:text-xl font-bold text-stone-600 dark:text-stone-200 group-hover:text-stone-900 dark:group-hover:text-white mb-[-2px] ml-1 ${pathname === "/" ? "text-stone-900 dark:text-white" : ""}`}
        >
          NHL Stats
        </h1>
      </Link>
      <ul className="fixed bottom-0 left-0 z-10 lg:z-0 bg-gray-100 dark:bg-stone-800 border-t lg:border-t-0 border-stone-300 dark:border-stone-700 lg:bg-transparent lg:dark:bg-transparent p-2 lg:p-0 lg:static flex flex-row justify-around lg:justify-end w-full gap-2 lg:gap-5 leading-tight tracking-wide select-none">
        {buttons.map((button) => (
          <li
            key={button.name}
            className="flex flex-row items-center justify-center"
          >
            <Link
              href={button.href}
              aria-current={pathname === button.href ? "page" : undefined}
              className={`flex flex-col lg:flex-row items-center justify-center cursor-pointer text-sm sm:text-base lg:text-xl font-bold text-stone-600 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white mb-[-2px] rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-gray-100 lg:focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-stone-800
             ${
               pathname === button.href
                 ? "lg:underline text-stone-900 dark:text-white"
                 : ""
             }`}
            >
              <span aria-hidden="true">
                {pathname === button.href ? button.iconSolid : button.icon}
              </span>
              <p className="lg:ml-1">{button.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavButtons;
