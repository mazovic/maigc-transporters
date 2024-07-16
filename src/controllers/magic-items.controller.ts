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
 *   post:
 *     summary: Add a Magic Item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Item1
 *               weight:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d9f53f8eb0c62f24b8e4f4
 *                 name:
 *                   type: string
 *                   example: Item1
 *                 weight:
 *                   type: integer
 *                   example: 20
 */
    @ResponseHandler()
    public async create(req: Request, res: Response, next: NextFunction) {
        return this.miService.create(req.body);
    }
}
