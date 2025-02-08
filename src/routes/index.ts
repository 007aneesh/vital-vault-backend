import { Request, Response, Router } from "express";
import v1 from "./v1";

const router = Router();

router.use("/v1", v1);

router.get("/status", (req: Request, res: Response) => {
  res.status(200).json({ message: "The API route is working fine" });
});

export default router;
