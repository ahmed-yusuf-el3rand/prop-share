export default function calculatePurchase(type, input, price) {
  if (type === "percentage") {
    return {
      percentage: input,
      amount: (input / 100) * price,
    };
  }
  return {
    amount: input,
    percentage: (input / price) * 100,
  };
}
