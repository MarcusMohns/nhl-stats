import { ReactNode } from "react";

type SelectTableButtonsProps = {
  buttons: { name: string; icon: ReactNode; iconSolid: ReactNode }[];
  selectedTable: string;
  handleSelectedTable: (button: string) => void;
};
export const SelectTableButtons = ({
  buttons,
  selectedTable,
  handleSelectedTable,
}: SelectTableButtonsProps) => {
  return (
    <div
      role="group"
      className="flex flex-col justify-center items-center xs:flex-row text-sm sm:text-base sm:mt-0 mt-5 sm:w-fit font-bold shadow-lg bg-stone-200 dark:bg-stone-800 sm:rounded-md overflow-hidden"
    >
      {buttons.map((button) => (
        <button
          key={button.name}
          onClick={() => handleSelectedTable(button.name)}
          aria-pressed={button.name === selectedTable}
          aria-label={`Select ${button.name}`}
          className={`flex flex-row items-center justify-center flex-grow gap-1 sm:p-3 p-1 py-3 xs:w-max w-full h-full border-none cursor-pointer transition-colors hover:bg-stone-300 dark:hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-800 focus-visible:z-10 ${
            button.name === selectedTable
              ? "bg-stone-300 dark:bg-stone-600"
              : "bg-stone-200 dark:bg-stone-800"
          }`}
        >
          {button.name === selectedTable ? button.iconSolid : button.icon}
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default SelectTableButtons;
