const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 text-lg font-medium border-b-2 transition-colors duration-200
      ${
        active
          ? "border-cyan-600 text-cyan-600"
          : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
      }`}
    onClick={onClick}
  >
    {Icon && <Icon size={20} />}
    {children}
  </button>
);

export default TabButton;
