const OwnerPercentagesGraph = ({ ownersData }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div className="md:w-1/2">
      <div className="bg-gray-50 p-5 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 ">
          Owners Percentages
        </h2>
        <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-gray-200">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="transform -rotate-90"
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#E5E7EB"
              strokeWidth="30"
            />{" "}
            {ownersData.map((slice, index) => {
              const segmentLength = (slice.percentage / 100) * circumference;
              const dashArray = `${segmentLength} ${
                circumference - segmentLength
              }`;
              const dashOffset = -currentOffset;
              currentOffset += segmentLength;

              return (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth="30"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-700 ease-out"
                />
              );
            })}
          </svg>
        </div>

        <ul className="mt-4 space-y-2">
          {ownersData.map((owner, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-gray-700"
            >
              <span className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: owner.color }}
                ></span>
                {owner.name}
              </span>
              <span className="font-medium">{owner.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default OwnerPercentagesGraph;
