import {
  getBankCardApi,
  addBankCardApi,
  deleteBankCardApi,
} from "../api/dashboard/bankCardApi";

const getBankCard = async ({ signal }) => {
  const response = await getBankCardApi({ signal });
  return response.data;
};

const addBankCard = async (cardDetails) => {
  const response = await addBankCardApi(cardDetails);
  return response.data;
};

const deleteBankCard = async (id) => {
  await deleteBankCardApi(id);
  return id;
};

export { getBankCard, addBankCard, deleteBankCard };

// setup intent
