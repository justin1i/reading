import webpack from 'webpack';
import path from 'path';

export default {
	devTool: 'eval',
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: __dirname,
			exclude: /node_modules/
		}]
	},
	/*plugins: [
		new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
	]*/
};