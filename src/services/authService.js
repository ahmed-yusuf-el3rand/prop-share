import {
  loginApi,
  googleLoginApi,
  registerApi,
  googleRegisterApi,
  verifyEmailApi,
  resendVerificationEmailApi,
  resetPasswordApi,
  changePasswordApi,
} from "../api/auth";

const loginUser = async (credentials) => {
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

const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await changePasswordApi({ currentPassword, newPassword });
  return data;
};



export {
  loginUser,
  loginWithGoogle,
  signupUser,
  signupWithGoogle,
  verifyEmail,
  resendVerificationEmail,
  changePassword,

};
