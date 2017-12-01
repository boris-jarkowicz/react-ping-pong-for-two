const io = require('socket.io')();

io.on('connection', (client) => {
    client.on('sendData', (data) => {
        console.log('client is sending ', data);
        client.emit('playerData', data);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
