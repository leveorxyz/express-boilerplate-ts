import { AuthSchemes } from "../types/auth";
import { httpConfigs, httpRouters } from "./http";
import { jwtConfigs, jwtRouters } from "./jwt";

export const authFactory = (scheme: AuthSchemes) => {
  return scheme === AuthSchemes.JWT
    ? { middleware: () => {}, router: jwtRouters }
    : { middleware: () => {}, router: httpRouters };
};
