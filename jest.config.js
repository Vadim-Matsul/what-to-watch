import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './'
});

/** @type { import('jest').Config } */

export default createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setupTests.js']
});
