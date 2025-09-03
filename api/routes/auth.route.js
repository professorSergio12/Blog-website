import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  google,
  forgetPassword,
  verifyOtp,
  resetPassword,
} from "../constollers/auth.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
