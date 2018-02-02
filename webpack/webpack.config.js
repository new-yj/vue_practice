var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	entry: {
		main: './main.js'
	},
	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: './dist/',
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		//重命名提取后的css文件
		new ExtractTextPlugin('main.css')
	]
};

module.exports = config;