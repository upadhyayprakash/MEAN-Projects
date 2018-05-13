var http = require('http');
http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type":"application/json"});
	response.write("Hello World");
	response.end();
}).listen(3030);
console.log("Server is Running: http://localhost:3030");