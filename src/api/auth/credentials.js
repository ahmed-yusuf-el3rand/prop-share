import client from "./client";

const registerApi = (userInfo) => client.post("/auth/register", userInfo);
const loginApi = (email, password) => client.post("/auth/login", { email, password });
const googleLoginApi = (code) => client.post("/auth/google", { code });
const googleRegisterApi = (userInfo) => client.post("/auth/google-register", userInfo);
const getCurrentUserApi = () => client.get("/auth/me");
const refreshTokenApi = () => client.post("/auth/refresh-token");
const logoutApi = () => client.post("/auth/logout");


const forgotPasswordApi = (email) => client.post("/auth/forgot-password", { email });
const resetPasswordApi = (token, newPassword) => client.post("/auth/reset-password", { token, newPassword });
const changePasswordApi = (currentPassword, newPassword) => client.post("/auth/change-password", { currentPassword, newPassword });



export  { loginApi,googleLoginApi,googleRegisterApi, registerApi, getCurrentUserApi, refreshTokenApi, logoutApi, forgotPasswordApi, resetPasswordApi, changePasswordApi };
