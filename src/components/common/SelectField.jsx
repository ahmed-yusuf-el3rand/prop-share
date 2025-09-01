const SelectField = ({
  label,
  value,
  onChange,
  options,
  className = "",
  icon: Icon = null,
  ...props
}) => (
  <div className="mb-4">
    {label && (
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}
      <select
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
          Icon ? "pl-10" : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectField;
