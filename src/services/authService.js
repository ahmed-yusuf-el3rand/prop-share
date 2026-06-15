import { loginApi, googleLoginApi } from "../api/authApi";

const loginUser = async (credentials) => {
  const response = await loginApi(credentials);
  return response.data;
};

const loginWithGoogle = async (accessToken) => {
  const response = await googleLoginApi(accessToken);
  return response.data;
};

export { loginUser, loginWithGoogle };