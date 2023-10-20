const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// This configuration is for server-side tests only. Please reach out on Telegram if you intend to write front-end tests.

// Add any custom config to be passed to Jest
const customJestConfig = {
  testEnvironment: "node",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
