import { AuthController } from "@/controller/auth.controller";
import { Router } from "express";

const router: Router = Router();
const controller = new AuthController();

router.post("/login", controller.login);
router.post('/verify', controller.verifyToken);

export const authRouter: Router = router;