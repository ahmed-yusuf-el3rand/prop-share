import client from "../client";

const getBankCardApi = ({ signal }) => client.get("/bank-card", { signal });

const createSetupIntentApi = (customerId) =>
  client.post("/create-setup-intent", { customerId });

const addBankCardApi = (cardDetails) => client.post("/bank-card", cardDetails);

const deleteBankCardApi = (id) => client.delete(`/bank-card/${id}`);

export {
  getBankCardApi,
  createSetupIntentApi,
  addBankCardApi,
  deleteBankCardApi,
};
