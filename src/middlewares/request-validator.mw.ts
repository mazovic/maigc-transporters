import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import logger from "../lib/logger";
export default (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();
    const { url } = req;
    if (!["post", "patch"].includes(method)) {
        return next();
    }
    if (!url.includes("/api")) {
        return next();
    }
    if (url.split("/").length < 3) {
        return next();
    }

    const [_, __, path, fn] = url.split("/");
    let schema;
    try {
        schema = (container.resolve(path) as any)?.[method]?.[fn];
    } catch (err) {
        logger.warn(`${req.url} does not have validation watch out`);
        return next();
    }
    try {
        if (!schema) {
            return next();
        }

        req.body = schema.parse(req.body);
    } catch (err) {
        next(err);
    }
    next();
};
