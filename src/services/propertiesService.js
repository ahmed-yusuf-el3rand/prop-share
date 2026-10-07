import {
  getPropertiesApi,
  getOwnedPropsApi,
  getOfferedPropsApi,
  getPropertyDetailsApi,
  buyShareApi,
  offerPercentageApi,
  cancelOfferApi,
} from "../api/propertiesApi";

const getProperties = async (params, { signal }) => {
  const response = await getPropertiesApi(params, { signal });
  return response.data;
};

const getPropertyDetails = async (propertyId, { signal }) => {
  const response = await getPropertyDetailsApi(propertyId, { signal });
  return response.data;
};
const getOwnedProps = async ({ signal }) => {
  const response = await getOwnedPropsApi({ signal });
  return response.data;
};

const getOfferedProps = async ({ signal }) => {
  const response = await getOfferedPropsApi({ signal });
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

const cancelOffer = async (offerId) => {
  const response = await cancelOfferApi(offerId);
  return response.data;
};

export {
  getProperties,
  getOwnedProps,
  getOfferedProps,
  getPropertyDetails,
  buyShare,
  offerPercentage,
  cancelOffer,
};
