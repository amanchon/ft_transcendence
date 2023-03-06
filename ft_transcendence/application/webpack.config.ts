const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./main.tsx",
    output: {
        path: path.join(__dirname, '../public'),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        static: '../public',
        historyApiFallback: true
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
       ".js": [".js", ".ts"],
       ".cjs": [".cjs", ".cts"],
       ".mjs": [".mjs", ".mts"]
      }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' })
    ]
};