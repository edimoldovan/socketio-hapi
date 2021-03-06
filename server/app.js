'use strict';

const hapi = require('hapi');
const server = new hapi.Server();

server.connection({
  port: 8000,
  labels: ['api']
});
server.connection({
  port: 8001,
  labels: ['chat']
});

var io = require('socket.io')(server.select('chat').listener);

io.on('connection', ( socket => {
  console.log('connected');
  socket.on('init', ( event => {
    let message = require('./controllers/message');
    console.log('init received');
    socket.emit('yo', message.sayHi('yo'));
  }));
}));

server.start( () => {
  console.log('Server running');
});
