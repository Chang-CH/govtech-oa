module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['unused-imports', '@typescript-eslint', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // parser: '@typescript-eslint/parser',
  rules: {
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    semi: 'warn',
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$', '.svg$'] }],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [
    {
      'files': ['*.tsx', '*.ts'],
      'extends': ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'project': './tsconfig.json',
        'tsconfigRootDir': './',
      },
    },
  ]
};
