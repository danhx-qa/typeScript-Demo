import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { EndOfLineState } from 'typescript';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'prettier/prettier': [
				'warn',
				{
					semi: true,
					singleQuote: true,
					trailingComma: 'es5',
					printWidth: 100,
					useTabs: true,
					tabWidth: 2,
					endOfLine: 'auto',
				},
			],
		},
		ignores: ['**/node_modules/', '**/dist/'],
	},
];
