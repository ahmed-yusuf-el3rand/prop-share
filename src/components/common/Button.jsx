const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon: Icon = null,
  active = null,
  ...props
}) => {
  let baseStyle =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  if (variant === "primary") {
    baseStyle += "bg-cyan-600 hover:bg-cyan-700 text-white shadow-md";
  } else if (variant === "secondary") {
    baseStyle += "bg-yellow-400 hover:bg-yellow-300 text-white shadow-sm";
  } else if (variant === "third") {
    baseStyle += "text-gray-700 hover:bg-yellow-300 hover:text-white";
  } else if (variant === "danger") {
    baseStyle += "bg-red-600 hover:bg-red-700 text-white shadow-md";
  } else if (variant === "ghost") {
    baseStyle += "text-gray-700 hover:bg-gray-300";
  } else if (variant === "success") {
    baseStyle += "bg-green-600 text-white cursor-not-allowed";
  } else if (variant === "ghost-1") {
    baseStyle =
      " px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-start gap-2 text-gray-700 hover:bg-gray-100";
  } else if (variant === "tabButton") {
    baseStyle = `flex items-center gap-2 px-4 py-2 text-lg font-medium border-b-2 transition-colors duration-200
      ${
        active
          ? "border-yellow-400 text-yellow-400"
          : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
      }`;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;
