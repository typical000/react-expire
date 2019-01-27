module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint-config-airbnb', 'prettier'],
  plugins: ['react', 'babel'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
};
