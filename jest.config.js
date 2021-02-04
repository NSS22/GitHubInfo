module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    roots: [
        '<rootDir>/src',
    ],
    testMatch: [
        '**/?(*.)+(spec|test).+(ts|js)',
    ],
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    coverageThreshold: {
        global: {
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    testTimeout: 10000,
};
