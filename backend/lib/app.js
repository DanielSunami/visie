const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	router = require('dir-routes');

app.disable('x-powered-by');
app.enable('trust proxy');
app.set('etag', false); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "Content-Length,Content-Range");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
	res.header("Access-Control-Allow-Headers", "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Content-Length,Content-Encoding");
	res.header("Access-Control-Max-Age", "1728000");

	next();
});

app.options('*', function(req, res, next) {

	res.status(200).end();
});

app.use(router);

app.get('*', function(req, res) {

	res.status(404).end();
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).end('Something broke!');
});

module.exports = app;