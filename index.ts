import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import prisma from "./configs/prisma.config";
import { wrappedResponse } from "./utils/functions";
import demoRoute from "./routes/demo.route";
import { authFactory, AuthSchemes } from "./auth";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || "8000");
const jwtProduct = authFactory(AuthSchemes.JWT);
const httpProduct = authFactory(AuthSchemes.HTTP);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/jwt", jwtProduct.router);
app.use("/http-token", httpProduct.router);

app.use("/hello", jwtProduct.middleware, demoRoute);

app.use("*", (_: Request, res: Response) => {
  return wrappedResponse(res, "Not Found", 404, null);
});

app.use(function onError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  return wrappedResponse(res, err.message, 500, null);
});

const server = app.listen(port, async () => {
  await prisma.$connect();
  console.log(`⚡️[server]: Server is running on PORT ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close();
  console.log("[server]: Server closed on SIGINT");
});
