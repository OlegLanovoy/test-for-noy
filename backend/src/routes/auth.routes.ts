import { Router } from "express";
import { login, register } from "../controllers/user.controller";
import handleValidationErrors from "../middlewares/handleValidationErrors";
import { loginValidation, registerValidation } from "../validations/auth.validation";

const authRouter = Router();

authRouter.post('/login', loginValidation, handleValidationErrors, login);
authRouter.post('/signup', registerValidation, handleValidationErrors, register);

export default authRouter;