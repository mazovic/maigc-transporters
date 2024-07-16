import express, {
    Application,
    Router,
    Request,
    Response,
    NextFunction
} from "express";
import mongoose from "mongoose";
import { RouteLoader } from "./loaders/route.loader";
import logger from "./lib/logger";
import { MiddlewareLoader } from "./loaders/middleware.loader";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger-config";
import { SchemaLoader } from "./loaders/schemas.loader";
import { ZodError } from "zod";
import { container } from "tsyringe";
import MagicItemModel from "./models/magic-items.model";
import MagicMoveModel from "./models/magic-mover.model";
import ActivityLog from "./models/activity-log.model";
import { AppError } from "./lib/AppError";

dotenv.config();

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.loadSchemas();
        this.loadModles();
        this.loadGlobalMiddlewares();
        this.loadRoutes();
        this.swaggerSetup();
        this.handleNotFoundRoutes();
        this.connectToDB();
        this.handleNotFoundRoutes();
        this.handleError();
    }
    private loadSchemas() {
        new SchemaLoader().load();
    }
    private loadGlobalMiddlewares() {
        new MiddlewareLoader().load().forEach(e => this.app.use(e));
    }

    private loadRoutes() {
        const routerLoader = new RouteLoader();
        const router = Router();
        const mws = routerLoader.load();
        mws.forEach(e => {
            router.use(...e);
        });
        this.app.use("/api", router);
    }

    private async connectToDB() {
        try {
            await mongoose.connect(
                process.env.MONGO_URI || "mongodb://localhost:27017/magic"
            );
            logger.info("Connected to MongoDB");
        } catch (error) {
            logger.error("Error connecting to MongoDB", error);
        }
    }

    private swaggerSetup(): void {
        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec)
        );
    }
    private handleError() {
        this.app.use(
            (err: unknown, req: Request, res: Response, next: NextFunction) => {
                let statusCode = 500;
                const ret: any = {
                    error: { message: "something went wrong" },
                    success: false
                };
                if (err instanceof ZodError) {
                    ret.error = err;
                    statusCode = 400;
                }
                if (err instanceof AppError) {
                    statusCode = err.statusCode;
                    ret.error = { ...err, message: err.message };
                }
                if (statusCode === 500) logger.error({ err });
                res.status(statusCode).json(ret);
            }
        );
    }
    private handleNotFoundRoutes() {
        this.app.use("*", (req, res) => {
            res.status(404).json({
                error: `${req.originalUrl} not found`,
                success: false
            });
        });
    }
    private loadModles() {
        container.register("MagicItemModel", { useValue: MagicItemModel });
        container.register("ActivityLogModel", { useValue: ActivityLog });
        container.register("MagicMoverModel", { useValue: MagicMoveModel });
    }
}

export default new App().app;
