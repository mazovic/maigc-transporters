import { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";
import morgan from "morgan";

const stream = {
    write: (message: string) => logger.info(message)
};
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return false;
    return env !== "development";
};
export default morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",

    { stream, skip }
);
