import { NextFunction, Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { TestService } from "../services/test.service";
import { ResponseHandler } from "../decorators/response-decorator";

@injectable()
export class TestController {
    constructor(private testService: TestService) {}
    /**
     * @swagger
     * /api/test/:
     *   get:
     *     summary: Test endpoint
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TestGetResponse'
     *
     * components:
     *   schemas:
     *     TestGetResponse:
     *       type: object
     *       properties:
     *         data:
     *           type: object
     *           properties:
     *             ok:
     *               type: boolean
     *         success:
     *           type: boolean
     */

    @ResponseHandler()
    public async get(req: Request, res: Response, next: NextFunction) {
        return this.testService.get();
    }
}
