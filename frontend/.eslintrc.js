module.exports = {
  // 'eslint-config-expo'を基本的なルールセットとして使用します
  extends: 'expo',
  // TypeScriptのファイルを正しく解析するための設定
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // ここに、プロジェクト独自のルールを追加できます
    // 例: 'react/prop-types': 'off', // propsの型チェックをTypeScriptに任せる
  },
};
