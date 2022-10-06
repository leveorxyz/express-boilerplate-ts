import express from "express";
import { createRefreshToken, login } from "./controllers";

const router = express.Router();
router.route("/refresh").post(createRefreshToken);
router.route("/login").post(login);

export default router;
