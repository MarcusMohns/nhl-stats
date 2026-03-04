const variants = {
  error: "bg-red-100 border-red-500 text-red-700",
  success: "bg-green-100 border-green-500 text-green-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
};

type AlertProps = {
  messageHeader: string;
  variant: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
};

const Alert = ({ messageHeader, variant, children, className }: AlertProps) => {
  const variantClasses = variants[variant];
  return (
    <div
      className={`border-l-4 p-4 ${variantClasses} ${className || ""}`}
      role="alert"
    >
      <h2 className="font-bold">{messageHeader}</h2>
      {children}
    </div>
  );
};

export default Alert;
