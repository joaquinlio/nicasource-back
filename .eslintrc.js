module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-import"],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
