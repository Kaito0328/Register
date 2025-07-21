// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
  },
  rules: {
    // カスタムルールがあればここに追加
  },
  ignorePatterns: ['dist/*', 'node_modules/*'],
};
