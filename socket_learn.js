var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
	console.log("client connected");
	client.on('join', function(name) {
		client.handle = name;
		client.broadcast.emit('messages', name + " joined the chat");
		client.emit('messages', "You have joined the chat as " + name);
	});
	client.on('messages', function (data) {
		var handle = client.handle;
		client.emit('messages', handle + ": " + data);
		client.broadcast.emit('messages', handle + ": " + data);
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html");
});
server.listen();