import "dotenv/config"

import chalk from "chalk"
import express from "express"
import morgan from "morgan"

import { PORT } from "./config"

export class Server {
  private readonly _app: express.Application

  readonly logger: {
    info: (message: string) => void
    error: (message: string) => void
  }

  constructor() {
    this._app = express()
      .enable("trust proxy")
      .use(
        morgan("dev", {
          skip: (req) => req.method === "OPTIONS",
          stream: { write: (message) => console.log(message + "\n\n") },
        }),
      )

    this.logger = {
      info: this.info,
      error: this.error,
    }
  }

  protected error(message: string) {
    console.log(`[${chalk.red("ERROR")}] `, message)
  }
  protected info(message: string) {
    console.log(`[${chalk.blue("INFO")}] `, message)
  }

  protected get app(): express.Application {
    return this._app
  }

  start(): void {
    this._app.listen(PORT, () => this.logger.info(`🚀 Server ready at: http://localhost:${PORT}` + "\n"))
  }
}
