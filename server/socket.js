const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { queue, enqueue, dequeue } = require('./queue');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  try {
    const newUser = enqueue(queue, socket.id);
    socket.emit('ALL_LINE', queue);
    socket.broadcast.emit('NEW_USER', newUser);

    socket.on('disconnect', () => {
      dequeue(queue, socket.id);
      io.emit('DROP_USER', socket.id);
    });
  } catch (error) {
    socket.emit('ALL_LINE', queue);
    socket.emit('ERROR', error.message);
  }
});

module.exports = { server, app };
