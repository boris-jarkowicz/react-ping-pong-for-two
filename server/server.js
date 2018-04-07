const io = require('socket.io')();
const port = 8000;
io.listen(port);
console.log('listening on port ', port);

const players = {};
const maxAllowedPlayers = 2;

const greetPlayer = (id, name) => {
    io.to(id).emit('serverToClient', `HELLO ${name}`);
};

const handleDataFromClient = (socket, data) => {
    console.log('client is sending ', data);
    socket.broadcast.emit('playerData', data);

    if (players.playerOne && data.playerId === players.playerOne.id) {
        console.log('PLAYER 1 STORED DATA', data.playerId);
        greetPlayer(socket.id, players.playerOne.name);
    }

    if (players.playerTwo && data.playerId === players.playerTwo.id) {
        console.log('PLAYER 2 STORED DATA', data.playerId);
        greetPlayer(socket.id, players.playerTwo.name);
    }
};

const registerPlayer = (playerName, id) => {
    io.to(id).emit('sendPlayerNumber', {
        playerName: playerName,
        playerId: id,
    });
    console.log('registerPlayer', {
        playerName: playerName,
        playerId: id,
    });
    const firstOrSecondPlayer = Object.keys(players).length === 0 ? 'playerOne' : 'playerTwo';

    players[firstOrSecondPlayer] = { id: id, name: playerName };
    greetPlayer(players[firstOrSecondPlayer].id, players[firstOrSecondPlayer].name);
};

const listenToConnection = () => {
    io.on('connection', (socket) => {
        const { clientsCount } = socket.conn.server;
        console.log('clientsCount', clientsCount);
        if (clientsCount > maxAllowedPlayers) {
            socket.disconnect();
        }
        console.log('CREATE PLAYER ONE', clientsCount > 0 && clientsCount < maxAllowedPlayers && !players.playerOne);
        if (clientsCount > 0 && clientsCount < maxAllowedPlayers && !players.playerOne) {
            const playerOneName = 'Player 1';
            registerPlayer(playerOneName, socket.id);
        }
        console.log('CREATE PLAYER TWO', clientsCount === maxAllowedPlayers && !players.playerTwo);
        if (clientsCount === maxAllowedPlayers && !players.playerTwo) {
            const playerTwoName = 'Player 2';
            registerPlayer(playerTwoName, socket.id);
        }

        console.log('CONNECTED PLAYERS', players);
        socket.on('disconnecting', (reason) => {
            const disconnectingSocketId = socket.id;
            console.log('DISCONNECTING PLAYER', socket.id);
            console.log('CONNECTED PLAYERS AFTER DISCONNECTED', players);
        });

        socket.on('sendData', data => handleDataFromClient(socket, data));
    });
};

listenToConnection();
