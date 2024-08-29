import express from "express";
const router = express.Router();
import { test } from "../constollers/user.controller.js";

router.get("/test", test);

export default router;
