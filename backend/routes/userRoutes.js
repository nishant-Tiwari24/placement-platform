import express from "express";
import { login, register, logout, getUser, updateUser, getStudent, updateSpecial, getStudentById } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.post("/update-detail", isAuthenticated, updateUser);
router.get("/getstudent", isAuthenticated, getStudent);
router.get("/getstudent/:id", isAuthenticated, getStudentById);
router.post("/updatespecial", isAuthenticated, updateSpecial);

export default router;
