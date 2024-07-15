import path from "path";
import * as glob from "glob";

/**
 * Load any file that matches the pattern of function file and require them.
 * @param pattern - Glob pattern to match files.
 * @returns An object of the required functions.
 */
const loadModules = (pattern: string): Record<string, any> => {
  const files = glob.sync(pattern);
  const modules: Record<string, any> = {};

  files.forEach((filePath) => {
    const key = path.basename(filePath, path.extname(filePath));
    modules[key] = require(path.resolve(filePath));
  });

  return modules;
};

export default loadModules;
