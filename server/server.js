const io = require('socket.io')();

io.on('connection', (client) => {
    console.log('CONNECTED', client);
    client.on('sendData', (data) => {
        console.log('client is sending ', data);
        client.broadcast.emit('playerData', data);
    });
});

const nsp = io.of('/arena');

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
