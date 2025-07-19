const InputField = ({ label, type = 'text', value, onChange, placeholder, className = '', icon: Icon = null, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${Icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${Icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      )}
    </div>
  </div>
);
export default InputField;