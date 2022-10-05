import { JWTPayload } from "../types/auth";
import jwt from "jsonwebtoken";
import { findUserById } from "../datastores/user.datastore";

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
