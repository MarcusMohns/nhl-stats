const Footer = () => {
  return (
    <footer
      className="min-h-[250px] w-full flex items-center justify-center border-t-2 border-stone-100 dark:border-stone-800 text-center p-5"
      aria-label="Footer with creator information"
    >
      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
        Made by Marcus Mohns using React, TypeScript & Tailwind CSS 2026 -
        Thanks to{" "}
        <a
          className="text-blue-800 dark:text-blue-400 underline"
          href="https://github.com/Zmalski/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @Zmalski
        </a>{" "}
        for the{" "}
        <a
          className="text-blue-800 dark:text-blue-400 underline"
          href="https://github.com/Zmalski/NHL-API-Reference"
          target="_blank"
          rel="noopener noreferrer"
        >
          unofficial NHL API documentation
        </a>
      </p>
    </footer>
  );
};

export default Footer;
