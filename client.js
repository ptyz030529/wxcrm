const client = require('socket.io-client')('http://192.168.2.194:3000');
client.on('connect', function(){
  console.log('eee');
});

client.emit('name', 'hello!');
