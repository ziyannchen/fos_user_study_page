module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'prefer-const': 0,
  },
};
