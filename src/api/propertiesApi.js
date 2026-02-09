import client from "./client";

const getPropertiesApi = (params) => client.get("properties", { params });
const getPropertyDetailsApi = (propertyId) =>
  client.get(`properties/${propertyId}`);
const getOwnedPropsApi = () => client.get("properties/owned");
const getOfferedPropsApi = () => client.get("properties/offered");

const buyShareApi = (purchasingDetails) =>
  client.patch("properties/buy", purchasingDetails);
const offerPercentageApi = (offerDetails) =>
  client.patch("properties/offer", offerDetails);

export {
  getPropertiesApi,
  getOwnedPropsApi,
  getOfferedPropsApi,
  getPropertyDetailsApi,
  buyShareApi,
  offerPercentageApi,
};
