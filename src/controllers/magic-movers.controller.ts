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
 *   post
 * :
 *     summary: Add a Magic Mover
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mover1
 *               weightLimit:
 *                 type: integer
 *                 example: 100
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
 *                   example: 60d9f4f88eb0c62f24b8e4f2
 *                 name:
 *                   type: string
 *                   example: Mover1
 *                 weightLimit:
 *                   type: integer
 *                   example: 100
 *                 questState:
 *                   type: string
 *                   example: resting
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 */

    @ResponseHandler()
    public async create(req: Request, res: Response, next: NextFunction) {
        return this.mmService.create(req.body);
    }
    /**
     * @swagger
     * /api/magic-movers/{id}/load-items:
     *   put:
     *     summary: Load Items onto a Magic Mover
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           example: 60d9f4f88eb0c62f24b8e4f2
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               items:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["Item1", "Item2"]
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
     *                   example: 60d9f4f88eb0c62f24b8e4f2
     *                 name:
     *                   type: string
     *                   example: Mover1
     *                 weightLimit:
     *                   type: integer
     *                   example: 100
     *                 questState:
     *                   type: string
     *                   example: loading
     *                 items:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ["60d9f53f8eb0c62f24b8e4f4", "60d9f53f8eb0c62f24b8e4f5"]
     */
    @ResponseHandler()
    public async loadItems(req: Request, res: Response, next: NextFunction) {
        return this.mmService.loadItems(req.params.id, req.body.items);
    }
     /**
     * @swagger
     * /api/magic-movers/{id}/start-mission:
     *   put:
     *     summary: Start a Mission
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           example: 60d9f4f88eb0c62f24b8e4f2
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
     *                   example: 60d9f4f88eb0c62f24b8e4f2
     *                 name:
     *                   type: string
     *                   example: Mover1
     *                 weightLimit:
     *                   type: integer
     *                   example: 100
     *                 questState:
     *                   type: string
     *                   example: on-mission
     *                 items:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ["60d9f53f8eb0c62f24b8e4f4", "60d9f53f8eb0c62f24b8e4f5"]
     */
    @ResponseHandler()
    public async startMission(req: Request, res: Response, next: NextFunction) {
        return this.mmService.startMission(req.params.id);
    }
/**
     * @swagger
     * /api/magic-movers/{id}/end-mission:
     *   put:
     *     summary: End a Mission
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           example: 60d9f4f88eb0c62f24b8e4f2
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
     *                   example: 60d9f4f88eb0c62f24b8e4f2
     *                 name:
     *                   type: string
     *                   example: Mover1
     *                 weightLimit:
     *                   type: integer
     *                   example: 100
     *                 questState:
     *                   type: string
     *                   example: resting
     *                 items:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: []
     */
    @ResponseHandler()
    public async endMission(req: Request, res: Response, next: NextFunction) {
        return this.mmService.endMission(req.params.id);
    }
/**
     * @swagger
     * /api/top-movers:
     *   get:
     *     summary: Get Top Movers
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   mover:
     *                     type: object
     *                     properties:
     *                       _id:
     *                         type: string
     *                         example: 60d9f4f88eb0c62f24b8e4f2
     *                       name:
     *                         type: string
     *                         example: Mover1
     *                       weightLimit:
     *                         type: integer
     *                         example: 100
     *                       questState:
     *                         type: string
     *                         example: resting
     *                       items:
     *                         type: array
     *                         items:
     *                           type: string
     *                         example: []
     *                   missionCount:
     *                     type: integer
     *                     example: 5
     */
    @ResponseHandler()
    public async getTopMovers(req: Request, res: Response, next: NextFunction) {
        return this.mmService.getTopMovers();
    }
}
