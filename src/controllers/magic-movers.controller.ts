import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { TestService } from "../services/test.service";
import { ResponseHandler } from "../decorators/response-decorator";
import { MagicMoverService } from "../services/magic-movers.service";

@injectable()
export class MagicMoverController {
    constructor(private mmService: MagicMoverService) {}
    /**
     * @swagger
     * /api/magic-movers/create:
     *   get:
     *     summary: crate a magic mover
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MagicMoverResponse'
     *
     * components:
     *   schemas:
     *     MagicMoverResponse:
     *       type: object
     *       properties:
     *         data:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             weightLimit:
     *               type: number
     *         success:
     *           type: boolean
     */

    @ResponseHandler()
    public async create(req: Request, res: Response, next: NextFunction) {
        return this.mmService.create(req.body);
    }
    @ResponseHandler()
    public async loadItems(req: Request, res: Response, next: NextFunction) {
        return this.mmService.loadItems(req.params.id, req.body);
    }
    @ResponseHandler()
    public async startMission(req: Request, res: Response, next: NextFunction) {
        return this.mmService.startMission(req.params.id);
    }

    @ResponseHandler()
    public async endMission(req: Request, res: Response, next: NextFunction) {
        return this.mmService.endMission(req.params.id);
    }

    @ResponseHandler()
    public async getTopMovers(req: Request, res: Response, next: NextFunction) {
        return this.mmService.getTopMovers();
    }
}
