module.exports = {
  // ★ 1. これがReact Native + Expoのテストに必要な設定をすべてやってくれます
  preset: 'jest-expo',

  // ★ 2. 変換対象外のリストを、実績のあるものに設定
  // これが 'import' 文のエラーを防ぎます
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))',
  ],

  // ★ 3. ユーザーさんのテスト準備ファイルを読み込みます
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  // ★ 4. TypeScriptのパスエイリアス（@/）をJestに教えます
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};