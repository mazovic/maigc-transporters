import fileLoader from "../lib/file-loader";
import { ILoader } from "./loader";

export class RouteLoader implements ILoader {
    load() {
        const routes = fileLoader("./**/*.route.*");
        const mws = Object.entries(routes).map(([path, M]) => {
            const routerPath = "/" + path.split(".")[0];
            return [routerPath, M.default];
        });
        return mws;
    }
}
