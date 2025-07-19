const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon: Icon = null,
  ...props
}) => {
  let baseStyle =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  if (variant === "primary") {
    baseStyle += " bg-blue-600 text-white hover:bg-blue-700 shadow-md";
  } else if (variant === "secondary") {
    baseStyle += " bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm";
  } else if (variant === "outline") {
    baseStyle += " border border-gray-300 text-gray-700 hover:bg-gray-50";
  } else if (variant === "danger") {
    baseStyle += " bg-red-600 text-white hover:bg-red-700 shadow-md";
  } else if (variant === "ghost") {
    baseStyle += " text-gray-700 hover:bg-gray-100";
  } else if (variant === "success") {
    baseStyle += " bg-green-600 text-white cursor-not-allowed";
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
