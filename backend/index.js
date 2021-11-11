'use strict';

global.rootDir = __dirname;

var http = require('http'),
	app = require('./lib/app.js');

var httpServer = http.createServer(app);

httpServer.listen(8090, function() {
	console.log('Listening on port %d', httpServer.address().port);
});