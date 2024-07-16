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

dotenv.config();

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.loadSchemas();
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
                if (err instanceof ZodError) {
                    return res.status(400).json(err);
                }
                logger.error({ err });
                res.status(500).json({
                    error: "Something went wrong",
                    success: false
                });
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
}

export default new App().app;
