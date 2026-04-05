import { Router } from "express";
import { handleLogin, handleSignup } from "../controllers/auth.controller.js";
import { validateLogin, validateSignup } from "../utils/validate.js";
import { validate } from "../middlewares/validate.js";
import { protectRoute } from "../middlewares/protect.js";
const router = Router();

router.post("/signup",validateSignup,validate, handleSignup);
router.post("/login", validateLogin,validate,protectRoute, handleLogin);



export default router;