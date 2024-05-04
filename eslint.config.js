import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ['@babel/preset-env']
        }
      }
    },
    ignores: ['eslint.config.js', 'gulpfile.js'],
    rules: {
      semi: [2, 'never']
    },
  }
]
