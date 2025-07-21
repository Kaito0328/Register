// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    // 未使用変数の警告を軽減
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    // React display nameを必須としない
    'react/display-name': 'off',
    // exhaustive-depsを警告レベルに
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: ['dist/*', 'node_modules/*'],
};
