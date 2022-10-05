import express from "express";
import { createRefreshToken } from "./controllers";

const router = express.Router();
router.route("/refresh").post(createRefreshToken);

export default router;
