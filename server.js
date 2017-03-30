var fs = require('fs');
var http = require("http");
var ejs = require('ejs');
var reqData = [];

http.createServer(function(request, response) {
	if (request.method = 'GET') {
		var Client = require('node-rest-client').Client;
		var client = new Client();
		var args = {
			headers: { "Content-Type": "application/json" , "Authorization": "Basic YWRtaW46cGFzc3dvcmQ=" } 
		};
		client.get("http://localhost:3000/api/channels", args,
			function (data, res) {
				console.log(JSON.parse(data)._embedded.channels[0].grabberQueries[0].queries);
				var channels = JSON.parse(data)._embedded.channels;
				var channelsNames = [];
				for (var i=0; i<channels.length; i++) {
					channelsNames[channelsNames.length] = "" + channels[i].name;
				}
				fs.readFile('channels.html', 'utf-8', function(err, content) {
					if (err) {
						response.end('error occurred');
						return;
					}	
					var renderedHtml = ejs.render(content, {channelsNames: channelsNames}); 
					response.end(renderedHtml);
				}
			);
		});
	};
}).listen(44);
