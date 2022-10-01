import defaultConfig from "./defaults";
import userConfig from "../../configs/auth.config";

import { Request, Response } from "express";
import { JwtOptions } from "../../types/auth";

export const createRefreshToken = async (req: Request, res: Response) => {
  const secret = (userConfig.JWT as JwtOptions).secret
    ? (userConfig.JWT as JwtOptions).secret
    : defaultConfig.secret;
};
