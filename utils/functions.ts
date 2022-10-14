import { Request, Response, NextFunction } from "express";

export const methodNotAllowed = (
  req: Request,
  res: Response,
  next: NextFunction
) => res.status(405).send({ error: "Method not allowed" });

export const wrappedResponse = (
  res: Response,
  message: string,
  statusCode: number,
  result: unknown
) => {
  return res.status(statusCode).json({
    message,
    statusCode,
    result,
  });
};

export const parseParam = (paramString: string) => {
  const params = paramString.split("&");
  const result = {};
  params.forEach((paramCouple: string) => {
    const [key, value] = paramCouple.split("=");
    (result as any)[key] = value;
  });
  return result;
};
