module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@lyra/eslint-config`
  extends: ["lyra"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
