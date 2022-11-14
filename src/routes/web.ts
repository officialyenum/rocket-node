import { Router } from "express";
import IndexController from "../controller/api/index.controller";

const router = Router();
/** Set up your web routes here */
router.get("/", IndexController.index);
router.get("/health", IndexController.health);

export default router;