import { RequestHandler, Router } from "express";

type AuthPack = {
  router: Router;
  authMiddleware: RequestHandler;
};

export const AuthSchemes = {
  JWT: "jwt",
  HTTP: "http",
};

export type AuthSchemes = typeof AuthSchemes[keyof typeof AuthSchemes];

export interface HttpOptions {
  expire?: number;
  secret?: string;
}

export interface JwtOptions {
  accessExpire?: number;
  refreshExpire?: number;
  secret?: string;
}
