module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
    "unused-imports",
    "jest",
  ],
  env: {
    "es6": true,
    "node": true,
    "jest/globals": true,
  },
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "require-jsdoc": ["off"],
    "object-curly-spacing": ["error", "always"],
  },
  settings: {
    "import/resolver": {
      typescript: { project: "./" },
      // たぶんeslintrc.jsからtsconfig.jsonがあるディレクトリへの相対パス
    },
  },
};
