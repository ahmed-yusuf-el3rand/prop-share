import client from "../client";

const getBankCardApi = ({ signal }) => client.get("/bank-card", { signal });

const addBankCardApi = (cardDetails) => client.post("/bank-card", cardDetails);

const deleteBankCardApi = (id) => client.delete(`/bank-card/${id}`);

export {
  getBankCardApi,
  addBankCardApi,
  deleteBankCardApi,
};
