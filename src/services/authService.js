import {
  loginApi,
  googleLoginApi,
  registerApi,
  googleRegisterApi,
  verifyEmailApi,
  resendVerificationEmailApi,
  changePasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/auth";

const login = async (credentials) => {
  const response = await loginApi(credentials);
  return response.data;
};

const loginWithGoogle = async (code) => {
  const response = await googleLoginApi(code);
  return response.data;
};

const signupUser = async (data) => {
  const response = await registerApi(data);
  return response.data;
};

const signupWithGoogle = async (code) => {
  const response = await googleRegisterApi(code);
  return response.data;
};

const verifyEmail = async (token) => {
  const response = await verifyEmailApi(token);
  return response.data;
};

const resendVerificationEmail = async (email) => {
  const response = await resendVerificationEmailApi(email);
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await forgotPasswordApi(email);
  return response.data;
};

const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await changePasswordApi({ currentPassword, newPassword });
  return data;
};
const resetPassword = async ({token, newPassword}) => {
  const response = await resetPasswordApi({token, newPassword});
  return response.data;
};

const getCurrentUser = async () => {
  const response = await getCurrentUserApi();
  return response.data;
}

const logout = async () => {
  const response = await logoutApi();
  return response.data;
}


export {
  login,
  loginWithGoogle,
  signupUser,
  signupWithGoogle,
  verifyEmail,
  resendVerificationEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  logout
};
