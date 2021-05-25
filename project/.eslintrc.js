module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: ['plugin:vue/essential'],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      'quotes': 'off',
      'semi': 'off', // 语句强制分号结尾
      'comma-dangle': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'space-before-function-paren': 'off',
      'prefer-const': 'off',
      'dot-notation': 'off',
      indent: 'off'
    }
  }
  