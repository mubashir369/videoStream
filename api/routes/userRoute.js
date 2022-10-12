import express from "express";
import { register, userLogin } from "../controllers/authController.js";
import UserModel from "../models/UserModel.js";

const router = express.Router();

router.post('/register',register)
router.post ('/login',userLogin)

export default router;
