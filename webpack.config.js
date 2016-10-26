/**
 * 说明: webpack的配置请在该文件进行修改
 * webpack配置文档请查看:https://webpack.github.io/docs/configuration.html
 */

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');
var webpack = require('webpack');

var srcPath = path.resolve(__dirname, './src'),
    outputPath = path.resolve(__dirname, './build');


var config = {

    context: srcPath,

    //webpack 编译的入口文件
    entry: {
        index: ['./index.jsx']
    },

    //输出的文件配置
    output: {
        path: outputPath,
        filename: '[name].js',
        publicPath: '/build/'
    },

    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test: /\.scss/,
            loader: ExtractTextPlugin.extract('style', 'raw!@ali/sass-loader')
        }]
    },

    plugins: [

        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify('development') },
            "__DEV__": JSON.stringify(JSON.parse('true'))
        }),

        //代码热替换
        new LiveReloadPlugin(),

        new ExtractTextPlugin('[name].css', { allChunks: true }),
        //进度插件
        new webpack.ProgressPlugin((percentage, msg) => {
            const stream = process.stderr;
            if (stream.isTTY && percentage < 0.71) {
                stream.cursorTo(0);
                stream.write(`📦   ${msg}`);
                stream.clearLine(1);
            }
        })
    ],

    devtool : 'source-map'
};

module.exports = config;
