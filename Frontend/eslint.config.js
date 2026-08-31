// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    // NgModule-declared controls (shared/controls, app-layout) and the
    // dialog forms that go with them deliberately follow the reference
    // project's conventions instead: one NgModule per component (not
    // standalone) and DanfeERP-style selectors (`ui-*`, `mat-*`, or bare
    // kebab-case like `select-check-all`) rather than an `app-` prefix.
    files: [
      'src/app/shared/controls/**/*.ts',
      'src/app/layout/app-layout/**/*.ts',
      'src/app/features/administration/academic-year/**/*.ts',
    ],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off',
      // Constructor injection matches the reference project's convention;
      // ControlValueAccessor's no-op onChange/onTouched placeholders are
      // idiomatic and get replaced by registerOnChange/registerOnTouched.
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      // mat-grid's onRowActionClick/onPageChange/etc. outputs, and its
      // aliased `[config]` input (backed by a `gridConfig` property),
      // deliberately match the reference project's grid API naming.
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/no-input-rename': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
