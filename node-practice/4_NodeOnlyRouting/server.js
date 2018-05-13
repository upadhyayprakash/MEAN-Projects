var http = require('http');
var app = require('./app');
http.createServer(app.handleRequest).listen(3031);
console.log("Server is Running: http://localhost:3031");