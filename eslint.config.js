import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules/", "dist/", "*.config.js"], // 👈 added here
  },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {},
    rules: {
      "tailwindcss/no-custom-classname": "off",
      "no-unused-vars": "off",
      "react/prop-types": "off",
    },
  },
]);
