module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  plugins: ['react'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
    'no-restricted-modules': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
    'react/prop-types': [0],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
    react : {
      version: 'latest',
    },
  },
};
