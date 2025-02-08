import { Router } from "express";
import { UserController } from "../../controllers/common";

const router = Router();

router.get("/me", UserController.getData);

export default router;
