import express from "express";
import { addEmployee } from "../services/settings/add_employee";

const router = express.Router();

// employee registration routes
router.post("/add-employee", addEmployee);

export default router;
