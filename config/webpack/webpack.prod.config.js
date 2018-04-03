var webpack = require('webpack');
const path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpackConfig = merge(baseWebpackConfig,{
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js' //非入口js打包规则；
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CleanWebpackPlugin(
            ['public/*'],　 //匹配删除的文件
            {
                root: __dirname, //根目录
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        ),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new HtmlWebpackPlugin({
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }

        })

    ]
});

module.exports = webpackConfig;