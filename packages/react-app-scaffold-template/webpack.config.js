/**
 * 
 */

const path = require('path');
const webpack = require('webpack');

const parentRoot = path.join(process.env.PWD, '../../');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(parentRoot, 'src/client/index.html'),
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	context: parentRoot,
	entry: [
		'react-hot-loader/patch',

		'webpack-dev-server/client?http://localhost:8080',

		'webpack/hot/only-dev-server',

		path.join(parentRoot, 'src/client/index.jsx'),
	],

	output: {
		path: path.resolve(path.join(parentRoot, '../dist')),
		filename: 'index_bundle.js',
		publicPath: '/'
	},

	devtool: 'inline-source-map',

	devServer: {
		hot: true,

		contentBase: path.resolve('dist'),

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
			path.resolve(path.join(parentRoot,'src')),
			path.resolve(path.join(parentRoot,'node_modules')),
			path.resolve(path.join(parentRoot,'node_modules/react-app-scaffold-template/node_modules'))
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		HtmlWebpackPluginConfig
	]
};