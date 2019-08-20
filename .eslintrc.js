module.exports = {
  env: {
    browser: true,
    es5: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
