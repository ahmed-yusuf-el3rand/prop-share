import client from "/client";

const getBankCardApi = () => client.get("/bank-card");

const addBankCardApi = (cardDetails) =>
  client.post("/bank-card", cardDetails );

const deleteBankCardApi = (id) => client.delete(`/bank-card/${id}`);

export { getBankCardApi, addBankCardApi, deleteBankCardApi };
