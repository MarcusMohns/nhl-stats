"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NavButtons = () => {
  const pathname = usePathname();

  const buttons = [
    { name: "Home", href: "/", icon: "/home.svg" },
    { name: "Standings", href: "/standings", icon: "/standings.svg" },
    { name: "Schedule", href: "/schedule", icon: "/schedule.svg" },
    { name: "Leaderboard", href: "/leaderboard", icon: "/leaderboard.svg" },
    { name: "Playoffs", href: "/playoffs", icon: "/playoffs.svg" },
  ];

  return (
    <ul
      className="fixed bottom-0 left-0 z-2 bg-gray-100 dark:bg-stone-800 
      border-t-1 md:border-t-0 md:bg-transparent md:dark:bg-transparent 
    p-2 md:p-0 md:static flex flex-row justify-around md:justify-center md:justify-start w-full 
   gap-2 md:gap-5 leading-tight tracking-wide select-none"
    >
      {buttons.map((button) => (
        <li
          key={button.name}
          className={`${button.name === "Home" && "md:mr-auto"}`}
        >
          <Link
            href={button.href}
            className={`flex flex-col items-center cursor-pointer 
            text-sm sm:text-base md:text-2xl font-bold text-stone-600 dark:text-stone-200 
            hover:text-stone-900 dark:hover:text-white mb-[-2px]
             ${
               pathname === button.href &&
               "border-b-2 border-stone-900 dark:border-white text-stone-900 dark:text-white"
             }`}
          >
            <span className="flex items-center flex-col lg:flex-row gap-2">
              <Image
                src={button.icon}
                alt={button.name}
                width={24}
                height={24}
                className="w-6 h-6 dark:invert"
              />
              {button.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavButtons;
