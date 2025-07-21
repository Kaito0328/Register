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
  },
  rules: {
    // カスタムルールがあればここに追加
  },
  ignorePatterns: ['dist/*', 'node_modules/*'],
};
