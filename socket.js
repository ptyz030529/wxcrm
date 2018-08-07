const http = require("http");
 
const server = http.createServer();
 
const io = require('socket.io').listen(server);

server.listen(3000);
console.log('Server running at http://192.168.2.194:3000');

io.sockets.on('connection', function (socket) {
	console.log('asdasd');
	socket.on('name', function (data) { 
		console.log(data.room);
		socket.join(data.room);
	});	
 
	socket.on('disconnect', function () { 
		
	});	
 
	socket.on('message:send', function (data) {
		var from = data.from;
		console.log(data.message+"  "+from);
		socket.broadcast.to(from).emit('message', { 'message':data.message });
	});
 
});