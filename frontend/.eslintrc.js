module.exports = {
  // 'eslint-config-expo'を基本的なルールセットとして使用します
  // これがReact, React Native, Expoに関する基本的なルールをすべて含んでいます
  extends: 'expo',
  
  // TypeScriptのファイルを正しく解析するための設定
  parser: '@typescript-eslint/parser',
  
  // ルールを上書きしたり、追加したりできます
  rules: {
    // 例: propsの型チェックをTypeScriptに任せるので、ESLintのルールはオフにする
    'react/prop-types': 'off', 
  },
};
