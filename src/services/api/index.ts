/* eslint-disable no-param-reassign */
import axios from "axios";

import { config } from "@/constants/config";

const http = axios.create({
  baseURL: config.apiBaseUrl,
});

http.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // console.log("error");
    }

    throw error;
  },
);

export default http;

export const endpoints = {
  auth: {
    // profile
    me: "/profile",
    // sign-up-with-phone-number
    verify_phone_otp: "/auth/verify-phone-otp",
    send_otp_code: "/auth/otp/phone",
    sign_up_phone: "/auth/signup-phone",
    sign_in_phone: "/auth/signin-phone",
    verify_email: "/auth/signin",
    // sign-in-with-email
    sign_in_with_email: "/auth/otp/email",
    sign_up_with_email: "/auth/signup-email",
    // sign-in-with-google
    sign_in_with_google: "/auth/google/callback",
    // logout
    logout: "/auth/logout",
    // refresh-token
    refresh: "/auth/refresh",
  },
};
