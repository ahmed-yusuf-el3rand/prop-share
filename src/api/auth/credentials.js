import client from "../client";

const registerApi = ({ name, email, password }) => client.post("/auth/register", { name, email, password });
const loginApi = ({ email, password }) => client.post("/auth/login", { email, password });
const googleLoginApi = ({ code }) => client.post("/auth/google", { code });
const googleRegisterApi = ({ name, email, password }) => client.post("/auth/google-register", { name, email, password });

const changePasswordApi = ({ currentPassword, newPassword }) => client.put("/auth/change-password", { currentPassword, newPassword });

const forgotPasswordApi = ({ email }) => client.post("/auth/forgot-password", { email });
const resetPasswordApi = ({ token, newPassword }) => client.post("/auth/reset-password", { token, newPassword });

const refreshTokenApi = () => client.post("/auth/refresh-token");

const logoutApi = () => client.post("/auth/logout");
const getCurrentUserApi = () => client.get("/auth/me");


export  { loginApi,googleLoginApi,googleRegisterApi, registerApi, changePasswordApi , forgotPasswordApi, resetPasswordApi,getCurrentUserApi, logoutApi };
