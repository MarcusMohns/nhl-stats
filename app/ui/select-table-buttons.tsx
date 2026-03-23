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
      className="flex flex-row flex-wrap justify-center items-center p-1 gap-1 text-sm font-bold bg-stone-100 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700/50 w-full sm:w-max"
    >
      {buttons.map((button) => {
        const isSelected = button.name === selectedTable;
        return (
          <button
            key={button.name}
            onClick={() => handleSelectedTable(button.name)}
            aria-pressed={isSelected}
            aria-label={`Select ${button.name}`}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 flex-1 sm:flex-none ${
              isSelected
                ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-200 dark:ring-stone-600"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-700/30"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
          >
            {isSelected ? button.iconSolid : button.icon}
            <span>{button.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SelectTableButtons;
