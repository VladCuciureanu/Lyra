import * as glob from "glob"
import { MODULE_HOOKS_PATHS } from "./config"

export function loadHooks() {
  const filePaths = glob.sync(__dirname + "/.." + MODULE_HOOKS_PATHS)
  filePaths.forEach(require)
}
