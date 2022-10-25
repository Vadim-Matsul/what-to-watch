import nextJest from 'next/jest.js'

const createConfig = nextJest({
  dir: './src'
});

export default createConfig({
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  globals: {
    'ts-jest': {
      'tsconfig': 'tsconfig.jest.json'
    }
  }
});
