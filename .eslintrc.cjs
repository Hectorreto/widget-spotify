const stylistic = require('@stylistic/eslint-plugin');

const customized = stylistic.configs.customize({
  arrowParens: true,
  blockSpacing: true,
  braceStyle: '1tbs',
  commaDangle: 'always-multiline',
  indent: 2,
  jsx: true,
  quoteProps: 'consistent-as-needed',
  quotes: 'single',
  semi: true,
});

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@stylistic/recommended-extends'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    ...customized.rules,
    '@stylistic/multiline-ternary': ['off'],
    '@stylistic/jsx-one-expression-per-line': ['off'],
  },
}
