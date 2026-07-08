import client from "../client";

const verifyEmailApi = (token) => client.post("/auth/verify-email", { token });
const resendVerificationEmailApi = (email) => client.post("/auth/resend-verification", { email });

export { verifyEmailApi, resendVerificationEmailApi };