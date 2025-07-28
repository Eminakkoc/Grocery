import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const compatObject = compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'next',
    'plugin:@typescript-eslint/recommended',
    'prettier'
);

const config = [
    ...compatObject,
    {
        ignores: [
            'node_modules',
            '.next',
            'dist',
            'coverage',
            '*.config.js', // Optional: ignore config files
            'public',
            '.vscode',
        ],
    },
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error', // ✅ shows Prettier errors as ESLint errors
        },
    },
    prettierConfig,
];

export default config;
