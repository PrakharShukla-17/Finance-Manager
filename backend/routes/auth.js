import express from "express";
const authRouter=express.Router();
import { inputValidate } from "../middlewares/inputValidation.js";
import { loginUser,signupUser } from "../controllers/authControllers.js";
import { userLoginSchema } from "../schemas/userLoginSchema.js";
import { userSignupSchema } from "../schemas/userSignupSchema.js";

authRouter.post("/signup",inputValidate(userSignupSchema),signupUser)

authRouter.post("/login",inputValidate(userLoginSchema),loginUser)

export default authRouter;