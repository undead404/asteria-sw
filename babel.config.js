// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  ignore: ['node_modules', 'build'],
  plugins: [
    // Stage 2
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-throw-expressions',

    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: false,
      },
    ],
    '@babel/plugin-proposal-json-strings',
  ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
