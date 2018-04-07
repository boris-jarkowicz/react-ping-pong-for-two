const io = require('socket.io')();
const port = 8000;
io.listen(port);
console.log('listening on port ', port);

const players = {};
const maxAllowedPlayers = 2;

const greetPlayer = (id, name) => {
    io.to(id).emit('serverToClient', `HELLO ${name}`);
};

const emitPingBallMovementDirection = (ballOptions = {}, socket) => {
    io.to(ballOptions.id).emit('pingBallMovementDirection', ballOptions.direction);
};

const initPingBall = (socket, gameOver = false) => {
    let ballOptions;

    if (gameOver) {
        return;
    }

    const playerId = { id: socket.id };

    if (players.playerOne && socket.id === players.playerOne.id) {
        ballOptions = Object.assign({}, playerId, { direction: 1 });
    }

    if (players.playerTwo && socket.id === players.playerTwo.id) {
        ballOptions = Object.assign({}, playerId, { direction: -1 });
    }

    if (ballOptions) {
        emitPingBallMovementDirection(ballOptions, socket);
    }
};

const handleDataFromClient = (socket, data) => {
    console.log('client is sending ', data);
    socket.broadcast.emit('playerData', data);

    if (players.playerOne && data.playerId === players.playerOne.id) {
        greetPlayer(socket.id, players.playerOne.name);
        initPingBall(socket);
    }

    if (players.playerTwo && data.playerId === players.playerTwo.id) {
        greetPlayer(socket.id, players.playerTwo.name);
        initPingBall(socket);
    }
};

const registerPlayer = (playerName, id) => {
    io.to(id).emit('sendPlayerNumber', {
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

        if (clientsCount > maxAllowedPlayers) {
            socket.disconnect();
        }

        if (clientsCount > 0 && clientsCount < maxAllowedPlayers && !players.playerOne) {
            const playerOneName = 'Player 1';
            registerPlayer(playerOneName, socket.id);
        }

        if (clientsCount === maxAllowedPlayers && !players.playerTwo) {
            const playerTwoName = 'Player 2';
            registerPlayer(playerTwoName, socket.id);
        }

        const bothPlayersConnected = players.playerOne && players.playerTwo ? true : false;

        socket.on('sendData', data => handleDataFromClient(socket, data));
        initPingBall(socket);

        console.log('CONNECTED PLAYERS', players);
        socket.on('disconnecting', (reason) => {
            const disconnectingSocketId = socket.id;
            console.log('DISCONNECTING PLAYER', socket.id);
            console.log('CONNECTED PLAYERS AFTER DISCONNECTED', players);
        });
    });
};

listenToConnection();
