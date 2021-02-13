module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'object-shorthand': 'off',
    'prefer-template': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-escape': 'off',
    'prefer-destructuring': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
  },
};
