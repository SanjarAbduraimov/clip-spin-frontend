import { Dispatch } from "react";

export interface ISignUpWithEmail {
  fio: string;
  email: string;
  password: string;
}

export interface ISignInWithEmail {
  email: string;
}

export interface ISendOtpCode {
  phone: string;
}

export interface IVerifyOtpCode {
  phone: string;
  code: number;
  code_hash: string;
}

export interface ISignUpWithPhone {
  phone: string;
  fio: string;
  password: string;
}

export interface ISignInWithPhone {
  phone: string;
  password: string;
}

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

export type AuthUserType = {
  email: string;
  _id: string;
  role: Roles;
  accessToken: string;
};

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType | null;
};

export interface JWTContextType {
  user: AuthUserType | null;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  logout: () => Promise<void>;
  dispatch: Dispatch<any>;
}

export enum Types {
  // initial
  INITIAL = "INITIAL",
  // sign-up-with-email
  SIGN_UP_WITH_EMAIL = "SIGN_UP_WITH_EMAIL",
  SIGN_IN_WITH_EMAIL = "SIGN_IN_WITH_EMAIL",
  // sign-up-with-phone-number
  SEND_OTP_CODE = "SEND_OTP_CODE",
  VERIFY_PHONE_OTP = "VERIFY_PHONE_OTP",
  SIGN_UP_WITH_PHONE = "SIGN_UP_WITH_PHONE",
  // logout
  LOGOUT = "LOGOUT",
}

export type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType | null;
  };
  [Types.SIGN_UP_WITH_EMAIL]: {
    user: AuthUserType | null;
  };
  [Types.SIGN_IN_WITH_EMAIL]: {
    user: AuthUserType | null;
  };
  [Types.SEND_OTP_CODE]: {
    user: AuthUserType | null;
  };
  [Types.VERIFY_PHONE_OTP]: {
    user: AuthUserType | null;
  };
  [Types.SIGN_UP_WITH_PHONE]: {
    user: AuthUserType | null;
  };
  [Types.LOGOUT]: undefined;
};
