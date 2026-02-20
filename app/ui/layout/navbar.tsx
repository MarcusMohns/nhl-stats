import React from "react";
// import LoadingIndicator from "@/app/ui/loading-indicator";
import ThemeToggle from "./theme-toggle";
import NavButtons from "./nav-buttons";
const Navbar = () => {
  return (
    <nav className="flex w-full flex-row items-center p-4 bg-gray-200 dark:bg-stone-800">
      <NavButtons />
      <ThemeToggle />
      {/* <LoadingIndicator /> */}
    </nav>
  );
};

export default Navbar;
