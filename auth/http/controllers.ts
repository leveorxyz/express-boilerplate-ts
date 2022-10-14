import { Request, Response } from "express";
import { User } from "@prisma/client";

import defaultConfig from "./defaults";
import userConfig from "../../configs/auth.config";
import { wrappedResponse } from "../../utils/functions";
import {
  createJwtToken,
  makeUser,
  validateUser,
} from "../../services/user.service";

export const login = async (
  req: Request,
  res: Response<GlobalResponse<{ token: string } | null>>
) => {
  const secret = (userConfig.JWT as HttpOptions).secret ?? defaultConfig.secret;
  const expire = (userConfig.JWT as HttpOptions).expire ?? defaultConfig.expire;

  const validationResult = await validateUser(
    req.body.email,
    req.body.password
  );

  if (!validationResult.payload) {
    return wrappedResponse(res, validationResult.message, 400, null);
  }

  const token = createJwtToken(
    { id: validationResult.payload.id },
    secret,
    expire
  );

  return wrappedResponse(res, "Login successful", 200, {
    token,
  });
};

export const register = async (
  req: Request<Omit<User, "id">>,
  res: Response<GlobalResponse<null>>
) => {
  const userResult = await makeUser(req.body);

  if (!userResult.payload) {
    return wrappedResponse(res, userResult.message, 400, null);
  }

  return wrappedResponse(res, "User created successfully", 201, null);
};
