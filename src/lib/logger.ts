import winston from "winston";

winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    request: "orange",
    debug: "white"
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        new winston.transports.File({ filename: "combined.log" })
    ]
});

export default logger;
