module.exports = {
  env: {
    browser: true,
    es2021: 2021,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    'no-console': 'off',
    'camelcase': 'off',
  }
}