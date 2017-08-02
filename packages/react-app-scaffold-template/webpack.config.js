/**
 * 
 */

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/client/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: [
		'react-hot-loader/patch',

		'webpack-dev-server/client?http://localhost:8080',

		'webpack/hot/only-dev-server',

		'./src/client/index.jsx',
	],

	output: {
		path: path.resolve('dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},

	devtool: 'inline-source-map',

	devServer: {
		hot: true,

		contentBase: path.resolve(__dirname, 'dist'),

		publicPath: '/'
	},

	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {
				presets: ['es2015', 'react', 'react-hmre']
			} },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {
				presets: ['es2015', 'react', 'react-hmre']
			} }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		HtmlWebpackPluginConfig
	]
};