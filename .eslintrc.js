module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    project: "**/tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
    createDefaultProgram: true,
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off", //import React from 'react'
    "@typescript-eslint/no-misused-promises": "off",
    "spaced-comment": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/explicit-function-return-type": "off", // return 타입 X
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
  },
};
