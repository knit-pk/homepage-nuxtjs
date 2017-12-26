module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
    es6: true
  },
  extends: ['standard', 'plugin:jest/recommended'],
  // required to lint *.vue files
  plugins: [
    'html',
    'jest'
  ],
  // add your custom rules here
  rules: {
    'operator-linebreak': ['error', 'after']
   },
  globals: {}
};
