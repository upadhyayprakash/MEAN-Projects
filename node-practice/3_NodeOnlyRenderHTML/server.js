var http = require('http');
var fs = require('fs');
http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type":"text/html"});
	fs.readFile("./index.html", null, function(err, data){
		if(err)
		{
			console.log("File Not Sent...");
			response.writeHead(404);
			response.write('File Not Found..');
		}
		else
		{
			console.log("File index.html sent to Client...");
			response.write(data);
		}
		response.end();
	});
	
}).listen(3030);
console.log("Server is Running: http://localhost:3030");