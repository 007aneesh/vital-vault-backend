import { Router } from "express";
import {
  deleteSessionHandler,
  getSessionsHandler,
} from "../../controllers/common/session.controller";

const router = Router();

router.get("/", getSessionsHandler);
router.delete("/:id", deleteSessionHandler);

export default router;
