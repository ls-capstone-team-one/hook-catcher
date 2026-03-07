import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
  rules.base.importsStrict,
]);

const reactConfig = defineConfig([
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...configs.react.recommended,
  rules.react.strict,
]);

const typescriptConfig = defineConfig([
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript.typescriptEslintStrict,
  ...configs.react.typescript,
]);

const prettierConfig = defineConfig([
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
]);

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...reactConfig,
  ...typescriptConfig,
  ...prettierConfig,
  reactRefresh.configs.vite,
  {
    name: 'project/overrides',
    rules: {
      // Not needed with React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',
      // Named exports are preferred for tree-shaking and re-exports
      'import-x/prefer-default-export': 'off',
      // Too strict for React components — TS infers return types fine
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Vite serves files from public/ via absolute paths (e.g. /vite.svg)
      'import-x/no-absolute-path': 'off',
    },
  },
  {
    name: 'project/shadcn-overrides',
    files: ['src/components/ui/**/*.tsx'],
    rules: {
      // shadcn components use namespace imports and multi-exports by design
      'import-x/no-namespace': 'off',
      'react/require-default-props': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
]);
