import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import { MagicMoverController } from "../controllers/magic-movers.controller";

const controller = container.resolve(MagicMoverController);

const router = Router();

router.post("/create", (req, res, next) => controller.create(req, res, next));

router.post("/:id/load-items", (req, res, next) =>
    controller.loadItems(req, res, next)
);

export default router;
