import "dotenv/config"
import { prisma } from "./lib/prisma"
import { getModules as getModules } from "./lib/modules"
import { Server } from "./lib/server"
import { loadHooks } from "./lib/hooks"

class App extends Server {
  constructor() {
    super()
    this.init().catch((error) => {
      this.logger.error(error)
      process.exit(1)
    })
  }

  async init() {
    await this.setUpDb()
    await this.setUpAuth()
    await this.setUpModules()
    this.start()
  }

  async setUpDb() {
    await prisma.$connect()
    this.logger.info("🗄️ The database is ready!")
  }

  async setUpAuth() {
    // TODO
  }

  async setUpModules() {
    getModules().forEach((applicationModule) => {
      this.app.use("/" + applicationModule.name, applicationModule.router)
      this.logger.info(`⚙️ Loaded module '${applicationModule.name}' at '/${applicationModule.name}'!`)
    })
    loadHooks()
  }
}

new App()
