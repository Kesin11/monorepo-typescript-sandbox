// ref: https://zenn.dev/keita_hino/articles/798bf62c6db663

const js = require('@eslint/js')
const { FlatCompat } = require('@eslint/eslintrc')
const typescriptEslintParser = require('@typescript-eslint/parser')

const compat = new FlatCompat()

module.exports = [
    {
        ignores: ['**/dist/'],
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            // https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-environments%2C-hello-globals
            // It contains old config `env.node = true` feature.
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
        },
    },
    {
        files: ['packages/**/{src,__tests__}/**/*.ts'],
        // If need to override rules, uncomment here.
        // rules: {
        //     semi: ["error", "always"],
        // },
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
    },
    js.configs.recommended,
    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
    )
]
