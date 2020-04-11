module.exports = require('deepmerge')(require('../../eslint.common'), {
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
})
