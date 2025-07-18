// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ...他のプラグイン
      'react-native-reanimated/plugin', // ★ これを追加
    ],
  };
};