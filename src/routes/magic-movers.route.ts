import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import { MagicMoverController } from "../controllers/magic-movers.controller";

const controller = container.resolve(MagicMoverController);

const router = Router();

router.post("/create", (req, res, next) => controller.create(req, res, next));

router.put("/:id/load-items", (req, res, next) =>
    controller.loadItems(req, res, next)
);

router.put("/:id/start-mission", (req, res, next) =>
    controller.startMission(req, res, next)
);

router.put("/:id/end-mission", (req, res, next) =>
    controller.endMission(req, res, next)
);

router.get("/top-movers", (req, res, next) =>
    controller.getTopMovers(req, res, next)
);

export default router;
