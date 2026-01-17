import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

import eslintPluginPrettier from 'eslint-plugin-prettier';
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: eslintPluginPrettier },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: { semi: ['error', 'always'], quotes: ['error', 'single'], 'prettier/prettier': 'error' }
  }
]);
