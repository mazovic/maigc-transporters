import { Router } from "express";
import fileLoader from "../lib/file-loader";
import { ILoader } from "./loader";

export class MiddlewareLoader implements ILoader {
    load() {
        const mws = fileLoader("./**/*.mw.*");
        return Object.entries(mws)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([_, M]) => {
                return M.default;
            });
    }
}
