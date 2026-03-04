type ChipProps = {
  children: React.ReactNode;
  className?: string;
};
const Chip = ({ children, className }: ChipProps) => {
  return (
    <div
      className={`flex justify-center items-center h-7 w-max rounded-full px-3 text-xs font-bold ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Chip;
