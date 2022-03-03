module.exports = {
  displayName: 'pokefumi-e2e',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: true,
      diagnostics: true,
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/pokefumi-e2e',
};
