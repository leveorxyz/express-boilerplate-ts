import { RequestHandler, Router } from "express";

declare module "auth" {
  type AuthPack = {
    router: Router;
    authMiddleware: RequestHandler;
  };

  export const AuthSchemes = {
    JWT: "jwt",
    HTTP: "http",
  };

  export type AuthSchemes = typeof AuthSchemes[keyof typeof AuthSchemes];

  interface HttpOptions {
    expire?: number;
    secret?: string;
  }

  interface JwtOptions {
    accessExpire?: number;
    refreshExpire?: number;
    secret?: string;
  }

  export function generateAuthScheme(
    authScheme: AuthSchemes,
    options?: HttpOptions | JwtOptions
  ): AuthPack;
}
