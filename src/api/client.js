import axios from "axios";

let isLoggingOut = false;

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, config } = error;

    const ignoredRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/reset-password",
      "/auth/verify-email",
    ];

    const shouldIgnore = ignoredRoutes.some((route) =>
      config?.url?.includes(route),
    );

    if (status === 401 && !shouldIgnore && !isLoggingOut) {
      isLoggingOut = true;
      window.dispatchEvent(new Event("Unauthorized"));
    }

    return Promise.reject(error);
  },
);

export const resetLogoutState = () => {
  isLoggingOut = false;
};

export default client;

//  Refresh token interceptor (automatic access token renewal)
//  Request queue while refreshing tokens
//  Exponential retry for transient network failures
//  Global toast notifications for network/server errors
//  Offline detection and retry when connectivity returns
//  Structured logging for monitoring and debugging
