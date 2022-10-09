import { httpRouters, httpMiddleware } from "./http";
import { jwtRouters, jwtMiddleware } from "./jwt";

export const AuthSchemes = {
  JWT: "jwt",
  HTTP: "http",
};

export const authFactory = (
  scheme: typeof AuthSchemes[keyof typeof AuthSchemes]
) => {
  return scheme === AuthSchemes.JWT
    ? { middleware: jwtMiddleware, router: jwtRouters }
    : { middleware: httpMiddleware, router: httpRouters };
};
