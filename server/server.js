const io = require('socket.io')();

const players = {};
const maxAllowedPlayers = 2;

io.on('connection', (socket) => {
    const { clientsCount } = socket.conn.server;
    console.log('clientsCount', clientsCount);

    if (clientsCount > 0 && clientsCount < maxAllowedPlayers) {
        socket.emit('sendPlayerNumber', 'Player 1');
        players.playerOne = socket.id;
    }

    if (clientsCount === maxAllowedPlayers) {
        socket.emit('sendPlayerNumber', 'Player 2');
        players.playerTwo = socket.id;
        console.log('CONNECTED PLAYERS', players);
    }

    if (clientsCount > maxAllowedPlayers) {

    }

    socket.on('sendData', (data) => {
        //console.log('client is sending ', data);
        socket.broadcast.emit('playerData', data);
    });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
