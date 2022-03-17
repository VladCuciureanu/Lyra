// ENV VARIABLES
export const {
  NODE_ENV = "development",
  APP_ENV = "development",
  PORT = 5555,
  DATABASE_URL = "",
  WEB_URL = "localhost:3000",
} = process.env

// IS PRODUCTION
export const IS_PRODUCTION = APP_ENV === "production"

// WEB URL
export const FULL_WEB_URL = `${IS_PRODUCTION ? "https://" : "http://"}${WEB_URL}`

// MODULE ROUTER PATHS
export const MODULE_ROUTER_PATHS = "/modules/**/*routes.{js,ts}"
