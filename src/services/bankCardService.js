import {
  getBankCardApi,
  addBankCardApi,
  deleteBankCardApi,
} from "@/api/bankCardApi";

const getBankCard = async () => {
  const response = await getBankCardApi();
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
