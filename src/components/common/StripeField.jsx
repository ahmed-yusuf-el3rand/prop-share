const StripeField = ({ label, icon: Icon, id, isFocused, children }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <Icon
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <div
        id={id}
        className={`shadow border rounded-lg w-full py-2 px-3 pl-10 transition ${
          isFocused ? "ring-2 ring-cyan-500 border-cyan-500" : ""
        }`}
      >
        {children}
      </div>
    </div>
  </div>
);

export default StripeField;
