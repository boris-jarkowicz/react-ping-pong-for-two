import io from 'socket.io-client';
import { unsubscribe } from '../index';

const socket = io('http://localhost:8000', {
    autoConnect: false,
    reconnection: false,
});

//console.log('socket', socket);

function establishConnection(playerId, cb) {
    socket.id = playerId;
    socket.open();
    socket.on('connect', () => {
        console.log('CONNECTED');
        cb();
    });
}

function sendDataToServer(data) {
    socket.emit('sendData', data);
}

function getVillainPlayerDataFromServer(cb) {
    socket.on('playerData', data => cb(null, data));
}

function getPlayerNumber(cb) {
    socket.on('sendPlayerNumber', data => cb(null, data));
}

function getBallMovement(cb) {
    socket.on('pingBallMovementDirection', data => cb(null, data));
}

socket.on('serverToClient', (data) => {
    console.log('GREETING', data);
});

socket.on('disconnect', (error) => {
    console.error('RELOAD');
    unsubscribe();
    //window.localStorage.removeItem('playerData');
});

socket.on('connect_error', (error) => {
    console.error('CONNECTION ERROR');
    unsubscribe();
    window.localStorage.removeItem('playerData');
});

export {
    sendDataToServer,
    getVillainPlayerDataFromServer,
    getPlayerNumber,
    establishConnection,
    getBallMovement,
 };
