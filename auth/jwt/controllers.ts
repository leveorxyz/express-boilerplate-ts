import defaultConfig from "./defaults";
import userConfig from "../../configs/auth.config";

import { Request, Response } from "express";
import { JwtOptions } from "../../types/auth";
import { wrappedResponse } from "../../utils/functions";
import { validateJwt } from "../../services/user.service";

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

  return wrappedResponse(
    res,
    "Token created successfully",
    200,
    jwtResult.payload
  );
};
