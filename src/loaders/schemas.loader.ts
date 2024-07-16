import { Router } from "express";
import fileLoader from "../lib/file-loader";
import { ILoader } from "./loader";
import { container } from "tsyringe";

export class SchemaLoader implements ILoader {
    load() {
        const schemas = fileLoader("./src/**/*.schema.*");
        Object.entries(schemas).forEach(([fileName, M]) => {
            container.register(fileName.split(".")[0], { useValue: M.default });
        });
    }
}
