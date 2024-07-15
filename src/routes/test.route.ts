import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import { TestController } from "../controllers/test.controller";

const testController = container.resolve(TestController);

const router = Router();

router.get("/", (req, res, next) => testController.get(req, res, next));

export default router;
