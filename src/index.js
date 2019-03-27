const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

// initialization
const app = new express();
const server = http.createServer(app);

const io = socketIO(server);

//settings
app.set('port', process.env.PORT || 3800);

//middlewares

//sockets
require('./socket')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
server.listen(app.get('port'), () => {
  console.log('server on port 3800');
});
