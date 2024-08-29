import express from "express";
const router = express.Router();

import { signup } from "../constollers/auth.controller.js";

router.post('/signup', signup);

export default router;