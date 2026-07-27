import {
  getBankCardApi,
  addBankCardApi,
  createSetupIntentApi,
  deleteBankCardApi,
} from "../api/dashboard/bankCardApi";

const getBankCard = async () => {
  const response = await getBankCardApi();
  return response.data;
};

const createSetupIntent = async (customerId) => {
  const response = await createSetupIntentApi(customerId);
  return response.data.clientSecret;
}

const addBankCard = async (cardDetails) => {
  const response = await addBankCardApi(cardDetails);
  return response.data;
};

const deleteBankCard = async (id) => {
  await deleteBankCardApi(id);
  return id;
};

export { getBankCard, addBankCard, deleteBankCard };
