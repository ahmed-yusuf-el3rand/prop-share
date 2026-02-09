import {
  getPropertiesApi,
  getOwnedPropsApi,
  getOfferedPropsApi,
  getPropertyDetailsApi,
  buyShareApi,
  offerPercentageApi,
} from "../api/propertiesApi";

const getProperties = async (params) => {
  const response = await getPropertiesApi(params);
  return response.data;
};

const getPropertyDetails = async (propertyId) => {
  const response = await getPropertyDetailsApi(propertyId);
  return response.data;
};
const getOwnedProps = async () => {
  const response = await getOwnedPropsApi();
  return response.data;
};

const getOfferedProps = async () => {
  const response = await getOfferedPropsApi();
  return response.data;
};

const buyShare = async (purchasingDetails) => {
  const response = await buyShareApi(purchasingDetails);
  return response.data;
};

const offerPercentage = async (offerDetails) => {
  const response = await offerPercentageApi(offerDetails);
  return response.data;
};

export {
  getProperties,
  getOwnedProps,
  getOfferedProps,
  getPropertyDetails,
  buyShare,
  offerPercentage,
};
