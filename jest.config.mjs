/**
 * @jest-environment jsdom
 */
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  collectCoverage: false,
};

export default createJestConfig(customJestConfig);
