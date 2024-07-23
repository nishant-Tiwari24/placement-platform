import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { InviteContorller } from "../controllers/InviteContorller.js";


const router = express.Router();

router.post('/student',isAuthenticated, InviteContorller);

export default router;