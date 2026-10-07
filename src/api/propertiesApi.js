import client from "./client";

const getPropertiesApi = (params, { signal }) => client.get("properties", { params , signal });
const getPropertyDetailsApi = (propertyId, { signal }) => client.get(`properties/${propertyId}`, { signal });
const getOwnedPropsApi = ({ signal }) => client.get("properties/owned", { signal });
const getOfferedPropsApi = ({ signal }) => client.get("properties/offered", { signal });

const buyShareApi = (purchasingDetails) => client.patch("properties/buy", {purchasingDetails});
const offerPercentageApi = (offerDetails) => client.patch("properties/offer", {offerDetails});
const cancelOfferApi = (offerId) => client.delete(`properties/cancelOffer/${offerId}`);

export {
  getPropertiesApi,
  getOwnedPropsApi,
  getOfferedPropsApi,
  getPropertyDetailsApi,
  buyShareApi,
  offerPercentageApi,
  cancelOfferApi,
};
