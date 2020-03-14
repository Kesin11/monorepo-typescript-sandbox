module.exports = {
  "extends": [
      "standard",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
      "@typescript-eslint"
  ],
  "parserOptions": {
      "sourceType": "module",
  },
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off"
  }
}