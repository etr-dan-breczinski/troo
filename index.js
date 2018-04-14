const webpack = require('webpack');
const express = require('express');
const troo = require('./troo');
const Router = troo.Router
const ReactDOMServer = require('react-dom/server');

// import { renderToString } from 'react-dom/server';

const BUILD_DIRECTORY = __dirname
const server = express()
server.listen(8080)

// TODO - move this externally
const config = {
	serverEntry: __dirname + '/server/index.js',
	appEntry: __dirname + '/app/index.js',
	publicDirectory: __dirname + '/public'
}

// TODO - move build directories to project root
// TODO - add config/CL args for build/develop/production
// TODO - determine why es presets (i.e. es2017) are breaking webpack build
// TODO - remove React dependancy
// TODO - move troo into seperate package

const WEBPACK_MODULE = {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
		        options: {
		        	presets: ['react']
		        //   presets: ['@babel/preset-env']
		        }
			}
		}
	]
}

const app = express();

const NAMESPACE = 'baryonyx';

global[NAMESPACE] = {
	app: app,
	serverMethods: {}
};

const serverOutput = __dirname + '/build/server.js';
const appOutput = __dirname + '/build/app.js';

if (config.publicDirectory) {
	app.use(express.static(config.publicDirectory));
}

// build server code
webpack({
	entry: config.serverEntry,
	output: {
	  path: __dirname + '/build',
	  filename: 'server.js'
	},
	module: WEBPACK_MODULE
}, function(err){
	if (err) {
		console.error('Unable to build server code...');
		throw err;
	}
	// initialize server
	require('./build/server.js');
	// build app
	webpack({
		entry: config.appEntry,
		output: {
		  path: __dirname + '/build',
		  filename: 'app.js',
		  libraryTarget: 'commonjs2'
		},
		module: WEBPACK_MODULE
	}, function(err){
		if (err) {
			console.error('Unable to build app code...');
			throw err;
		}
		const app = require('./build/app.js').default;
		app({
			Server: troo.Server,
			Router: troo.Router,
			Root: troo.Root
		});

		// console.log('troo.root', troo.root)
		// console.log('asdf 1', troo._root)
		// troo._root()
		// console.log('asdf 2')
		// console.log('troo.getRoot()', troo.getRoot())

		const root = troo.getRoot();

		troo.Routes.get.forEach(function(r) {
			const path = r.route[0] === '/' ? r.route : '/' + r.route;
			server.get(path, (req, res) => {
				ReactDOMServer.renderToString(root)
				res.send(ReactDOMServer.renderToString(root()))
			});
		})



		// Router.get.bar = (args) => {
		// 	console.log('in app router', args)
		// }
		// console.log('Routes', troo.Routes)
	})
})



// console.log(global[NAMESPACE]);
// set up rpc method / route

// server singleton should expose server methods globally



// build server code

// run server code