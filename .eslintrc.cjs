// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["import", "unused-imports"],
  extends: ["eslint:recommended"],
  ignorePatterns: ["*.md"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "prettier",
      ],
      rules: {
        "import/order": [
          "warn",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              ["parent", "sibling"],
              "object",
              "type",
              "index",
            ],
            pathGroups: [
              {
                pattern: "@/**",
                group: "internal",
                position: "before",
              },
            ],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
          },
        ],
        "import/no-default-export": "error",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
    {
      files: ["src/pages/**/*.ts", "src/pages/**/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["*.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "max-lines": "off",
        "import/no-default-export": "off",
      },
    },
    {
      files: ["*.mdx"],
      extends: ["plugin:mdx/recommended"],
      settings: {
        "mdx/code-blocks": true,
      },
      rules: {
        "no-unused-vars": "off",
      },
    },
    {
      files: ["*.stories.*"],
      extends: ["plugin:storybook/recommended"],
      rules: {
        "import/no-default-export": "off",
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      files: ["*.cjs"],
      env: {
        node: true,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.test.(ts|tsx)"],
      plugins: ["jest-dom", "testing-library"],
      extends: ["plugin:jest-dom/recommended", "plugin:testing-library/react"],
    },
    {
      files: ["*.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
});
