import {  getProperties } from "../api/properties";

const propertiesService = {
  list: async (params = {}) => {
    const response = await getProperties(params);
    const data = response?.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.properties)) return data.properties;

    return [];
  },
   owned: () => getOwnedProperties(),
};

export default propertiesService;
