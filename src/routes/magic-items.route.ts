import { Router } from "express";
import { container } from "tsyringe";
import { MagicItemsController } from "../controllers/magic-items.controller";

const controller = container.resolve(MagicItemsController);

const router = Router();

router.post("/create", (req, res, next) => controller.create(req, res, next));

export default router;
