import client from "./client";

const getProperties = async (params = {}) => {
  const response = await client.get("properties", { params });
  return response.data;
};


export { getProperties };
