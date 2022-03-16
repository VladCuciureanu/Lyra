import "dotenv/config"
import { prisma } from "./lib/prisma"
import { Server } from "./lib/server"

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
    this.logger.info("DB Ready")
  }

  async setUpAuth() {
    // TODO
  }

  async setUpModules() {
    // TODO
  }
}

new App()
