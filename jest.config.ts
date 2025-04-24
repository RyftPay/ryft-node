import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
