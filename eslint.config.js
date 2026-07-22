import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },

  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/*.d.ts',
      '.turbo/**',
      'coverage/**',
    ],
  },
];