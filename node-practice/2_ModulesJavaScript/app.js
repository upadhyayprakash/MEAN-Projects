var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');

function onRequest(request, response)
{
	response.writeHead(200, {"Content-Type":"application/json"});
	response.write(module2.myString);
	module2.myFunction();
	console.log(module1.myString);
	response.end();
}
http.createServer(onRequest).listen(3030);
console.log("Server is Running: http://localhost:3030");