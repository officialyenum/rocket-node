import { Router } from "express";
import IndexController from "../controller/index.controller";

const router = Router();
/** Set up your web routes here */
router.get("/", IndexController.index);
router.get("/about", IndexController.about);
router.get("/health", IndexController.health);

export default router;