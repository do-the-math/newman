module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin

    'prettier/@typescript-eslint',
    'plugin:prettier/recommended' // Prettier rules for eslint
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
    'no-unreachable': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'prefer-object-spread': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'vars-on-top': 'error',
    'no-param-reassign': 'error',
    'no-multi-assign': 'error',
    'no-duplicate-imports': 'error',

    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/no-unused-vars': ['off']
    // 'prettier/prettier': [
    //   'warn',
    //   {
    //     usePrettierrc: false
    //   }
    // ]
  },
  ignorePatterns: ['dist/', 'node_modules/']
};
