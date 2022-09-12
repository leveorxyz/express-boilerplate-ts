import { Request, Response } from "express";

export const sendHello = (req: Request, res: Response) => {
  const response: Demo = {
    message: "Hello world",
  };
  res.send(response);
};
