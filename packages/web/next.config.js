const { withSentryConfig } = require("@sentry/nextjs")
const withTM = require("next-transpile-modules")(["@lyra/theme"])

const sentryWebpackPluginOptions = {
  silent: true,
}
module.exports = withSentryConfig(withTM({}), sentryWebpackPluginOptions)
