module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: 'airbnb-base',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'arrow-parens': [0],
		"arrow-body-style": [0],
		"no-unused-vars": [
			"warn",
			{
				"vars": "all",
				"args": "after-used",
				"ignoreRestSiblings": true,
			}
		],
		'prefer-destructuring': [0],
	},
};