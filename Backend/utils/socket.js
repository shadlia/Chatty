const socket = require('socket.io');

function configureSocket(server) {
  global.onlineUsers = new Map();

  const io = socket(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true, // Fixed typo in 'Credential'
    },
  });

  io.on('connection', (socket) => {
    console.log(socket);
    onlineUsers.set(userId, socket.id);

    socket.on('send-msg', (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        io.to(sendUserSocket).emit('msg-receive', data.msg); // Use io.to instead of socket.to
      }
    });
  });

  return io;
}

module.exports = { configureSocket };
