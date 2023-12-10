// ref: https://zenn.dev/keita_hino/articles/798bf62c6db663

const js = require("@eslint/js")
const { FlatCompat } = require("@eslint/eslintrc")
const typescriptEslintParser = require("@typescript-eslint/parser")
const typeScriptEslint = require("@typescript-eslint/eslint-plugin")
const eslintConfigPrettier = require("eslint-config-prettier")

const compat = new FlatCompat()

module.exports = [
  {
    ignores: ["**/dist/", "**/*.config.js"],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    files: ["**/*.ts"],
    // If need to override rules, uncomment here.
    // rules: {
    //     semi: ["error", "always"],
    // },
    plugins: { typeScriptEslint },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
]
