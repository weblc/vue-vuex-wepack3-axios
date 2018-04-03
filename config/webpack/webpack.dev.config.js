var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var publicPath = '/static/';
var baseWebpackConfig = require('./webpack.base.config');

var env = process.env.NODE_ENV;
// var { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');//分析模块
var webpackConfig = merge(baseWebpackConfig,{
    entry: {
        main: ['webpack-hot-middleware/client?reload=true', './src/main.js']
        // vendor: ['vue', 'iview']
    },
    devtool: 'source-map',
    output: {
        filename: 'js/[name].js',
        path: path.resolve('./public/static'),
        publicPath: publicPath, //html访问资源的地址;
        chunkFilename: 'js/[name].chunk.js' //非入口js打包规则；
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new BundleAnalyzerPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
});
module.exports = webpackConfig;
