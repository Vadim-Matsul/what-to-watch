const nextJest = require('next/jest');

const createConfig = nextJest({
  dir: './src'
});

const customConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  globals: {
    'ts-jest': {
      'tsconfig': 'tsconfig.jest.json'
    }
  }
};

const createAsyncConfig = createConfig(customConfig);

module.exports = async () => {
  const config = await createAsyncConfig();
  config.transformIgnorePatterns = ['/node_modules/(?!(axios)/)'];
  return config;
};
