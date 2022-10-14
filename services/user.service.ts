import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../datastores/user.datastore";
import { User } from "@prisma/client";

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

    if (e instanceof jwt.JsonWebTokenError && e.message == "jwt expired") {
      return {
        message: "Token Expired",
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

export const makeUser = async (user: Omit<User, "id">) => {
  const prevUser = await findUserByEmail(user.email);

  if (prevUser) {
    return {
      payload: null,
      message: "User already exists with this email",
    };
  }

  const hash = await bcrypt.hash(user.password, 12);

  const userPayload = { ...user };
  userPayload.password = hash;

  const newUser = await createUser(userPayload);

  return {
    payload: newUser,
  };
};