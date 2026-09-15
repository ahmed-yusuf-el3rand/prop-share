import client from "../api/client";

export const getPayoutAccount = async () => {
  const { data } = await client.get("/payouts/account");

  return data;
};

export const createPayoutOnboarding = async () => {
  const { data } = await client.post("/payouts/onboarding");

  return data;
};

export const withdrawMoney = async (amount) => {
  const { data } = await client.post("/payouts/withdraw", {
    amount,
  });

  return data;
};