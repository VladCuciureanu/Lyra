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
    const name = filePath.substring(filePath.lastIndexOf("/") + 1).slice(0, -10)
    let result = new ApplicationModule()
    result.name = name
    result.router = router
    return result
  })
}
