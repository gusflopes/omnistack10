const socketio = require('socket.io');

const parseStringasArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = []; // ideal é salvar no Redis

exports.setupWebsocket =  (server) => {
  console.log('ok')
  io = socketio(server);

  io.on('connection', socket => {
    console.log(socket.id);
    console.log(socket.handshake.query);

    const { latitude, longitude, techs} = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringasArray(techs),
    });

    setTimeout(() => { socket.emit('message', 'Hello Omnistack!!') }, 3000);
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item));
  });
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
    console.log(`Connection: ${connection.id}`)
  })
}