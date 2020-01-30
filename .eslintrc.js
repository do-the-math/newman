module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/no-unused-vars': ['off'],
    'prettier/prettier': [
      'warn',
      {
        usePrettierrc: false
      }
    ]
  },
  ignorePatterns: ['dist/', 'node_modules/']
};
