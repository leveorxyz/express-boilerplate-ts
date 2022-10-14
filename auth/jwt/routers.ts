import express from "express";
import { createRefreshToken, login, register } from "./controllers";

const router = express.Router();
router.route("/refresh").post(createRefreshToken);
router.route("/login").post(login);
router.route("/register").post(register);

export default router;
