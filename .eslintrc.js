module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
    es6: true,
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:vue/recommended',
  ],
  plugins: [
    'jest',
  ],
  // Add your custom rules here
  rules: {
    'operator-linebreak': ['error', 'after'],
    'array-bracket-spacing': ['error', 'never'],
    'no-unused-vars': ['error', { 'args': 'after-used' }],
    'computed-property-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/max-attributes-per-line': [ 4, {
      singleline: 4,
    }],
    'vue/attributes-order': [ 2, {
      order: [
        'LIST_RENDERING',
        'CONDITIONALS',
        'GLOBAL',
        'UNIQUE',
        'BINDING',
        'DEFINITION',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
        'RENDER_MODIFIERS',
      ],
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }]
   },
  globals: {},
}
