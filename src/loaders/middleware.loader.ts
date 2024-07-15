import { Router } from "express";
import fileLoader from "../lib/file-loader";
import { ILoader } from "./loader";

export class MiddlewareLoader implements ILoader {
    load() {
        const mws = fileLoader("./**/*.mw.*");
        return Object.values(mws).map(M => {
            return M.default;
        });
    }
}
