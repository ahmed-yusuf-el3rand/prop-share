const getDashboard = async (params = {}) => {
  const response = await client.get("/user/dashboard", { params });
  return response.data;
};
