import { httpRouters, httpMiddleware } from "./http";
import { jwtConfigs, jwtRouters } from "./jwt";

export const AuthSchemes = {
  JWT: "jwt",
  HTTP: "http",
};

export const authFactory = (
  scheme: typeof AuthSchemes[keyof typeof AuthSchemes]
) => {
  return scheme === AuthSchemes.JWT
    ? { middleware: () => {}, router: jwtRouters }
    : { middleware: httpMiddleware, router: httpRouters };
};
