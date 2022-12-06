module.exports = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      "tsconfig": "./tsconfig.dev.json",
      "useESM": true,
    },
  },
  testEnvironment: "node",
  roots: [
    "<rootDir>/",
  ],
  modulePaths: [
    "<rootDir>/",
  ],
  moduleDirectories: [
    "src",
    "node_modules",
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts"],
};
