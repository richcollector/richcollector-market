module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
	overrides: [],
	parserOptions: {
		project: '**/tsconfig.json',
		ecmaVersion: 'latest',
		sourceType: 'module',
		createDefaultProgram: true,
	},
	plugins: ['react'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'spaced-comment': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/consistent-indexed-object-style': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'react/display-name': 'off',
		'n/no-callback-literal': 'off',
	},
};
