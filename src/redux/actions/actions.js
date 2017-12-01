import { sendDataToServer, getDataFromServer } from '../../api';

export const MOVE_PADDLE = 'MOVE_PADDLE';
export const GET_PADDLE_SIZE = 'GET_PADDLE_SIZE';
export const GET_INITIAL_PLAYER_MOVEMENT = 'GET_INITIAL_PLAYER_MOVEMENT';

export function getPaddleSize() {
    console.log('ACTION CALLED: getPaddleSize');
    return {
        type: GET_PADDLE_SIZE,
    };
}

export function getInitialPlayerMovement() {
    console.log('ACTION CALLED: getInitialPlayerMovement');
    return {
        type: GET_INITIAL_PLAYER_MOVEMENT,
    };
}

export function movePaddle(keyCode) {
    const isMoving = keyCode === 40 || keyCode === 38;
    const moveUp = keyCode === 38 && isMoving;
    const moveDown = keyCode === 40 && isMoving;

    console.log('ACTION CALLED: movePaddle', keyCode);
    return {
        type: MOVE_PADDLE,
        payload: {
            moveUp,
            moveDown,
        },
    };
}

export function sendPlayerData(position) {
    sendDataToServer(position);

    return {
        type: MOVE_PADDLE,
    };
}

export function getPlayerData() {

    getDataFromServer((err, data) => {
        console.log('SERVERDATA ON CLIENT', data);
    });

    return {
        type: MOVE_PADDLE,
    };
}
