import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    ignores: ["**/node_modules/**", "**/*.config.js"], 
    languageOptions: {sourceType: "commonjs"},
    rules: {
      eqeqeq: ["error", "always"],
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-destructuring": "error",
      "semi": ["error", "always"],
      "indent": ["error", 2],

    },
  },
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
        
      }
    }
  },
  pluginJs.configs.recommended,
];