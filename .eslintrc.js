module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'no-continue': 0,
    'react/no-deprecated': 0,
    'react/forbid-foreign-prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-autofocus': 0,
    'max-classes-per-file': 0,
    'no-plusplus': 0,
  },
};
