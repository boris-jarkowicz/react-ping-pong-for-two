const io = require('socket.io')();

const players = {};
const maxAllowedPlayers = 2;

io.on('connection', (socket) => {
    const { clientsCount } = socket.conn.server;
    console.log('clientsCount', clientsCount);

    if (clientsCount > maxAllowedPlayers) {
        socket.disconnect();
    }

    if (clientsCount > 0 && clientsCount < maxAllowedPlayers && !players.playerOne) {
        io.to(socket.id).emit('sendPlayerNumber', {
            playerName: 'Player 1',
            playerId: socket.id,
        });
        players.playerOne = socket.id;
        io.to(socket.id).emit('serverToClient', 'HELLO PLAYER 1');
    }

    if (clientsCount === maxAllowedPlayers && !players.playerTwo) {
        io.to(socket.id).emit('sendPlayerNumber', {
            playerName: 'Player 2',
            playerId: socket.id,
        });
        players.playerTwo = socket.id;
        io.to(socket.id).emit('serverToClient', 'HELLO PLAYER 2');
    }

    console.log('CONNECTED PLAYERS', players);

    socket.on('sendData', (data) => {
        console.log('client is sending ', data);
        socket.broadcast.emit('playerData', data);

        if (data.playerId === players.playerOne) {
            console.log('PLAYER 1 STORED DATA', data.playerId);
            io.to(socket.id).emit('serverToClient', 'HELLO PLAYER 1');
        }

        if (data.playerId === players.playerTwo) {
            console.log('PLAYER 2 STORED DATA', data.playerId);
            io.to(socket.id).emit('serverToClient', 'HELLO PLAYER 2');
        }
    });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
