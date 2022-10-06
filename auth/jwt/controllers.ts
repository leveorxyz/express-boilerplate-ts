import defaultConfig from "./defaults";
import userConfig from "../../configs/auth.config";

import { Request, Response } from "express";
import { JwtOptions } from "../../types/auth";
import { wrappedResponse } from "../../utils/functions";
import { validateJwt, validateUser } from "../../services/user.service";
import { request } from "http";

export const createRefreshToken = async (
  req: Request,
  res: Response<GlobalResponse<string | null>>
) => {
  const secret = (userConfig.JWT as JwtOptions).secret
    ? (userConfig.JWT as JwtOptions).secret!
    : defaultConfig.secret;
  const refreshExpire = (userConfig.JWT as JwtOptions).refreshExpire
    ? (userConfig.JWT as JwtOptions).refreshExpire
    : defaultConfig.refreshExpire;

  if (!req.body.accessToken) {
    return wrappedResponse(res, "No access token in body", 400, null);
  }
  const accessToken = req.body.accessToken;

  const jwtResult = await validateJwt(accessToken, secret);

  if (!jwtResult.payload) {
    return wrappedResponse(res, jwtResult.message, 400, null);
  }

  // TODO: add token creation

  return wrappedResponse(
    res,
    "Token created successfully",
    200,
    jwtResult.payload
  );
};

export const login = async (
  req: Request,
  res: Response<
    GlobalResponse<{ accessToken: string; refreshToken: string } | null>
  >
) => {
  const validationResult = await validateUser(
    req.body.email,
    req.body.password
  );

  if (!validationResult.payload) {
    return wrappedResponse(res, validationResult.message, 400, null);
  }

  // TODO: token creation

  return wrappedResponse(res, "Login successful", 200, {
    accessToken: "",
    refreshToken: "",
  });
};
