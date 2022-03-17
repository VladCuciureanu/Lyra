import * as glob from "glob"
import { MODULE_ROUTER_PATHS } from "./config"

export class ApplicationModule {
  name: string
  router: any
}

export function getModules(): ApplicationModule[] {
  const filePaths = glob.sync(__dirname + "/.." + MODULE_ROUTER_PATHS)
  return filePaths.map((filePath) => {
    const router = require(filePath)
    const name = filePath.split('/').at(-2)!
    return {name: name, router: router}
  })
}
