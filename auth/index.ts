import { httpRouters, httpMiddleware } from "./http";
import { jwtRouters, jwtMiddleware } from "./jwt";

export enum AuthSchemes {
  JWT = "jwt",
  HTTP = "http",
}

export const authFactory = (
  scheme: typeof AuthSchemes[keyof typeof AuthSchemes]
) => {
  const authMap = new Map<string, Object>([
    [AuthSchemes.JWT, { middleware: jwtMiddleware, router: jwtRouters }],
    [AuthSchemes.HTTP, { middleware: httpMiddleware, router: httpRouters }],
  ]);

  const authProduct = authMap.get(scheme);

  if (!authProduct) {
    throw new Error(
      `Invalid auth scheme. Must be any of ${Object.values(AuthSchemes)}`
    );
  }

  return authProduct;
};
