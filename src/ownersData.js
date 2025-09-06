export const ownersData = [
    { name: "You", percentage: 5, color: "#3B82F6" },
    { name: "Owner A", percentage: 20, color: "#F59E0B" },
    { name: "Owner B", percentage: 15, color: "#10B981" },
    { name: "Available", percentage: 100 - (5 + 20 + 15), color: "#6B7280" },
  ].filter((data) => data.percentage > 0);