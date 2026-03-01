import ThemeToggle from "./theme-toggle";
import NavButtons from "./nav-buttons";
const Navbar = () => {
  return (
    <nav className="flex w-full flex-row items-center p-4 border-b border-gray-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
      <NavButtons />
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
