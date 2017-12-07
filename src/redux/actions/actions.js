import { sendDataToServer, getDataFromServer } from '../../client';

export const MOVE_PADDLE = 'MOVE_PADDLE';
export const GET_PADDLE_SIZE = 'GET_PADDLE_SIZE';
export const GET_INITIAL_PLAYER_MOVEMENT = 'GET_INITIAL_PLAYER_MOVEMENT';
export const GET_VILLAIN_MOVEMENT = 'GET_VILLAIN_MOVEMENT';

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

export function mapVillainMovementToState(data) {
    const villainPosition = data.yPos;
    console.log('mapVillainMovementToState', villainPosition);
    return {
        type: GET_VILLAIN_MOVEMENT,
        payload: {
            villainPosition,
        }
    };
}

export function getPlayerData() {
    console.log('GETTING FROM SERVER');

    getDataFromServer((err, data) => {
        console.log('getDataFromServer', data);
        mapVillainMovementToState(data);
    });
}
