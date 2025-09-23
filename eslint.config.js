//  @ts-check
import eslintjs from '@eslint/js'
import { projectStructurePlugin } from 'eslint-plugin-project-structure'
import globals from 'globals'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  /**
   *  Here you will add your normal rules, which use the default parser.
   *  `tseslint.configs.recommended` and `eslint.configs.recommended` are written in such a way that their rules are not added globally.
   *  Some recommended rules require the default parser and will not work with additional extensions. Therefore,
   *  we want `projectStructureParser` to be used exclusively by the `project-structure/folder-structure` rule.
   */
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslintjs.configs.recommended,
      tseslint.configs.strict,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      importPlugin.flatConfigs.recommended,
      prettier,
    ],
    plugins: {
      'project-structure': projectStructurePlugin,
    },
    languageOptions: {
      ecmaVersion: 2024,
      globals: { ...globals.browser, ...globals.vitest },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^/'], // Ignores all absolute paths (that start with /)
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // internal modules
            'parent', // ../
            'sibling', // ./
            'index', // ./index
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/newline-after-import': 'error',
      semi: ['error', 'always'], // force semicolons
    },
  },
])
