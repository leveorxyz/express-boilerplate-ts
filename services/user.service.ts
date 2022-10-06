import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWTPayload } from "../types/auth";
import { findUserByEmail, findUserById } from "../datastores/user.datastore";

export const validateJwt = async (token: string, secret: string) => {
  try {
    const payload = jwt.verify(token, secret) as JWTPayload;
    const user = await findUserById(payload.id);

    if (!user) {
      return {
        message: "Invalid Token",
        payload: null,
      };
    }

    return {
      payload,
    };
  } catch (e: any) {
    if (e instanceof jwt.JsonWebTokenError && e.message != "jwt expired") {
      return {
        message: "Invalid Token",
        payload: null,
      };
    }

    return {
      message: e.message,
      payload: null,
    };
  }
};

export const validateUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      message: "Invalid credentials",
      payload: null,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      message: "Invalid credentials",
      payload: null,
    };
  }

  return {
    payload: user,
  };
};

export const createJwtToken = (
  payload: { [key: string]: any },
  secret: string,
  expire: number | string
) => {
  return jwt.sign(payload, secret, { expiresIn: expire });
};
