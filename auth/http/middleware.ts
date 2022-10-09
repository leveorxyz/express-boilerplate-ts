import { NextFunction, Request, Response } from "express";

import { validateJwt } from "../../services/user.service";
import { wrappedResponse } from "../../utils/functions";
import userConfig from "../../configs/auth.config";
import defaultConfig from "./defaults";
import { findUserById } from "../../datastores/user.datastore";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return wrappedResponse(res, "Authorization header not present", 401, null);
  }

  const secret = (userConfig.JWT as HttpOptions).secret ?? defaultConfig.secret;
  const userResult = await validateJwt(req.headers.authorization, secret);

  if (!userResult.payload) {
    return wrappedResponse(res, userResult.message, 400, null);
  }

  res.locals.user = await findUserById(userResult.payload.id);
  next();
};

export default authMiddleware;
