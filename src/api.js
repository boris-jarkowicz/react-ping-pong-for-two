import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function sendDataToServer(data) {
    socket.emit('sendData', data);
}

function getDataFromServer(cb) {
    socket.on('playerData', data => cb(null, data));
    //console.log('SERVER DATA', cb(null, ));
}

export {
    sendDataToServer,
    getDataFromServer,
 };
