import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,

  {
    rules: {
      // Warn for unused variables
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Error if a function or variable is used but not defined
      "no-undef": "error",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
