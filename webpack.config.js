const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/dist'),
        },
        open: true,
        port: 3000,
    },
};
