const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
});

/** @type { import('jest').Config } */

const jestConfigOptions = {
  testEnvironment: 'jest-environment-jsdom'
}

module.exports = createJestConfig(jestConfigOptions)