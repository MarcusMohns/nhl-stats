import React from "react";
import Link from "next/link";
import LoadingIndicator from "../loading-indicator";
import ThemeToggle from "./theme-toggle";
import NavButtons from "./nav-buttons";

const Navbar = () => {
  return (
    <nav
      className="flex w-full flex-direction:row align-center items-center p-4  
    bg-gray-200 dark:bg-stone-800"
    >
      <NavButtons />
      <ThemeToggle />
      {/* <LoadingIndicator /> */}
    </nav>
  );
};

export default Navbar;
