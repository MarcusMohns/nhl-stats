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
    <ul
      className="flex sm:flex-wrap text-sm sm:text-base font-bold mt-1 sm:rounded-sm 
    shadow-lg sm:w-fit bg-stone-200 dark:bg-stone-800"
    >
      {buttons.map((button) => (
        <li className="w-full h-auto sm:w-max" key={button.name}>
          <button
            onClick={() => handleSelectedTable(button.name)}
            aria-pressed={button.name === selectedTable}
            aria-label={`Select ${button.name}`}
            className={`flex flex-row items-center gap-1 sm:p-3 p-1 py-3 w-full h-full hover:bg-stone-300 dark:hover:bg-stone-600 border-none cursor-pointer 
             ${
               button.name === selectedTable
                 ? "bg-stone-300 dark:bg-stone-600"
                 : "bg-stone-200 dark:bg-stone-800"
             } ${
               // last button
               button.name === buttons[buttons.length - 1].name &&
               "border-r-2 rounded-tr-sm rounded-br-sm"
             }
          ${
            // first button
            button === buttons[0] && "border-l-2 rounded-bl-sm rounded-tl-sm"
          }
        `}
          >
            {button.name === selectedTable ? button.iconSolid : button.icon}
            {button.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTableButtons;
