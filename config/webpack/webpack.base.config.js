var webpack = require('webpack');
var path = require('path');
var config = require('../index');
// var publicPath = '/build/';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        main: './src/main.js',
        vendor: ['vue','element-ui','echarts']
    },
    output: {
        path: path.resolve('./public/static'),
        publicPath: config.staticPath, //html访问资源的地址;
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js' //非入口js打包规则；
    },
    module: {
        // avoid webpack trying to shim process
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'images/[name].[hash:7].[ext]'
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },

        {
            // 依赖库，禁用CSS modules
            test: /\.css$/,
            // exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            })
        }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            'src': path.resolve(config.rootPath, './src'),
            '@views': path.resolve(config.rootPath, './src/views'),
            '@utils': path.resolve(config.rootPath, './src/utils'),
            '@api': path.resolve(config.rootPath, './src/api'),
            '@components': path.resolve(config.rootPath, './src/components')
        },
        extensions: ['.js','.json','.css','.sass','.vue']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({
                resource
            }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon:'./src/img/favicon.ico', //favicon路径
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),

        new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
    ]

};
