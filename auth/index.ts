import { Request, Response, Router, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import QueryString from "qs";

import { httpRouters, httpMiddleware } from "./http";
import { jwtRouters, jwtMiddleware } from "./jwt";

export enum AuthSchemes {
  JWT = "jwt",
  HTTP = "http",
}

type authMapKey = {
  middleware: (
    req: Request<
      ParamsDictionary,
      any,
      any,
      QueryString.ParsedQs,
      Record<string, any>
    >,
    res: Response<unknown>,
    next: NextFunction
  ) => Promise<unknown>;
  router: Router;
};

export const authFactory = (
  scheme: typeof AuthSchemes[keyof typeof AuthSchemes]
) => {
  const authMap = new Map<string, authMapKey>([
    [AuthSchemes.JWT, { middleware: jwtMiddleware, router: jwtRouters }],
    [AuthSchemes.HTTP, { middleware: httpMiddleware, router: httpRouters }],
  ]);

  const authProduct = authMap.get(scheme);

  if (!authProduct) {
    throw new Error(
      `Invalid auth scheme. Must be any of ${JSON.stringify(
        Object.values(AuthSchemes)
      )}`
    );
  }

  return authProduct;
};
