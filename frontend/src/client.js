//const BASE_URL = (process.env.NODE_ENV == "production") ? 'https://api.orastreio.com.br' : 'http://127.0.0.1:8099';
const BASE_URL = 'http://127.0.0.1:8090';

export default {
	get: function(url, handler) {
		let req = new XMLHttpRequest();
		const finalURL = BASE_URL+url;
		req.open('GET', finalURL);
		req.onload = function() {

			handler(JSON.parse(req.response));
		};

		req.send();
	},
	post: function(url, data, handler, progress){
		progress = progress || function(){};
		
		let req = new XMLHttpRequest();
		const finalURL = BASE_URL+url;
		req.open('POST', finalURL);
		if(typeof data === 'string') req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		else if(typeof data === 'object') {
			req.setRequestHeader('Content-Type', 'application/json');
			data = JSON.stringify(data);
		}
		req.onload = function() {

			handler(JSON.parse(req.response));
		};
		req.upload.onprogress = function (event) {
			progress(event);
		};

		req.send(data);
	},
	delete: function(url, handler){
		let req = new XMLHttpRequest();
		const finalURL = BASE_URL+url;
		req.open( "DELETE", finalURL);
		req.onload = function() {

			handler(JSON.parse(req.response));
		};
		req.send();
	},
	BASE_URL
}