import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ResponseHandler } from "../decorators/response-decorator";
import { MagicItemService } from "../services/magic-items.service";

@injectable()
export class MagicItemsController {
    constructor(private miService: MagicItemService) {}
    /**
     * @swagger
     * /api/magic-items/create:
     *   get:
     *     summary: crate a magic item
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/MagicItemsResponse'
     *
     * components:
     *   schemas:
     *     MagicItemsResponse:
     *       type: object
     *       properties:
     *         data:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             weight:
     *               type: number
     *         success:
     *           type: boolean
     */

    @ResponseHandler()
    public async create(req: Request, res: Response, next: NextFunction) {
        return this.miService.create(req.body);
    }
}
