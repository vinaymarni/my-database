const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['sql'], // Add languages you need
      features: ['coreCommands', 'find', 'gotoSymbol', 'hover', 'multiCursor', 'rename', 'suggest'],
    }),
  ],
};
