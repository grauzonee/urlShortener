// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: ['/node_modules/(?!chalk)/'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1', // for ESM imports with .js extensions
    },
};

export default config;

