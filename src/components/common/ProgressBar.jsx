const ProgressBar = ({ progress, label, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5  ${className}`}>
    <div
      className="bg-cyan-600 h-2.5 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
    {label && (
      <span className="text-sm text-gray-600  mt-1 block">{label}</span>
    )}
  </div>
);
export default ProgressBar;
