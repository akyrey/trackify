require('jest-preset-angular/ngcc-jest-processor');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', '<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html', 'json', 'text-summary'],
  coverageDirectory: 'coverage/jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  testRunner: 'jest-jasmine2',
};
