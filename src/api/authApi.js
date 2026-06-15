import client from "./client";

const registerApi = (userInfo) => client.post("/auth/register", userInfo);
const loginApi = (email, password) => client.post("/auth/login", { email, password });
const googleLoginApi = (code) => client.post("/auth/google", { code });
const getCurrentUserApi = () => client.get("/auth/me");
const refreshTokenApi = () => client.post("/auth/refresh-token");
const logoutApi = () => client.post("/auth/logout");


const forgotPasswordApi = (email) => client.post("/auth/forgot-password", { email });
const resetPasswordApi = (token, newPassword) => client.post("/auth/reset-password", { token, newPassword });
const changePasswordApi = (currentPassword, newPassword) => client.post("/auth/change-password", { currentPassword, newPassword });

const verifyEmailApi = (token) => client.post("/auth/verify-email", { token });
const resendVerificationEmailApi = (email) => client.post("/auth/resend-verification", { email });

const deleteAccountApi = () => client.delete("/auth/delete");

const updateProfileApi = (profileData) => client.put("/auth/profile", profileData);

const getUserRolesApi = () => client.get("/auth/roles");
const getUserPermissionsApi = () => client.get("/auth/permissions");
const getUserSessionsApi = () => client.get("/auth/sessions");

const revokeSessionApi = (sessionId) => client.post("/auth/sessions/revoke", { sessionId });
const getUserActivityApi = () => client.get("/auth/activity");
const getUserSettingsApi = () => client.get("/auth/settings");

export  { loginApi,googleLoginApi};
