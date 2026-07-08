import { loginApi, googleLoginApi,signupApi,googleSignupApi,resendVerificationEmailApi } from "@api/auth";

const loginUser = async (credentials) => {
  const response = await loginApi(credentials);
  return response.data;
};

const loginWithGoogle = async (code) => {
  const response = await googleLoginApi(code);
  return response.data;
};

const signupUser = async (data) => {
  const response = await signupApi(data);
  return response.data;
};

const signupWithGoogle = async (code) => {
  const response = await googleSignupApi(code);
  return response.data;
}

const resendVerificationEmail = async (email) => {
  const response= await resendVerificationEmailApi(email);
  return response.data;
};


export { loginUser, loginWithGoogle, signupUser, signupWithGoogle,resendVerificationEmail };