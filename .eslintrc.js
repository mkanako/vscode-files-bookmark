module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'quote-props': [
      'error',
      'consistent-as-needed',
    ],
  },
}
