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
		"indent": ["error", "tab"],
		"no-tabs": [0],
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
		'camelcase': [0],
		"consistent-return": [0]
	}
};