import { getState } from '../../index';
import {
    sendDataToServer,
    getVillainPlayerDataFromServer,
    getPlayerNumber,
    getBallMovement,
} from '../../modules/client';

export const MOVE_PADDLE = 'MOVE_PADDLE';
export const INIT_PADDLE = 'INIT_PADDLE';
export const GET_INITIAL_PLAYER_MOVEMENT = 'GET_INITIAL_PLAYER_MOVEMENT';
export const GET_VILLAIN_MOVEMENT = 'GET_VILLAIN_MOVEMENT';
export const MAP_BALL_DIRECTION_TO_STATE = 'MAP_BALL_DIRECTION_TO_STATE';
export const MOVE_PING_BALL = 'MOVE_PING_BALL';

export function initPaddle(playerData) {
    console.log('ACTION CALLED: initPaddle', playerData);
    return {
        type: INIT_PADDLE,
        payload: {
            playerData,
        }
    };
}

export function setPingBallDirection(direction) {
    return {
        type: MAP_BALL_DIRECTION_TO_STATE,
        payload: {
            direction,
        },
    };
}

export function movePingBall(isMoving, direction, xPos, yPos) {
    return {
        type: MOVE_PING_BALL,
        payload: {
            isMoving, direction, xPos, yPos
        },
    };
}

export function movePaddle(keyCode) {
    const isMoving = keyCode === 40 || keyCode === 38;
    const moveUp = keyCode === 38 && isMoving;
    const moveDown = keyCode === 40 && isMoving;

    const state = getState();

    const {
        yPos,
        canvasHeight,
        jailBox,
        movementSpeed
    } = state.playerState;

    const allowedToMoveDown = yPos + canvasHeight < window.innerHeight - jailBox;
    const allowedToMoveUp = yPos - jailBox > 0;

    const newPos = moveUp && allowedToMoveUp ?
                    yPos + -Math.abs(movementSpeed)
                    : moveDown && allowedToMoveDown
                    ? yPos + movementSpeed : yPos + 0;

    if (moveUp || moveDown) {
        sendDataToServer({yPos: newPos});
    }

    return {
        type: MOVE_PADDLE,
        payload: {
            newPos,
        },
    };
}

export function mapVillainMovementToState(data) {
    const villainPosition = data ? data.yPos : 0;
    return {
        type: GET_VILLAIN_MOVEMENT,
        payload: {
            yPos: villainPosition,
        }
    };
}

// ASYNC ACTIONS
export function getVillainData() {
    return dispatch => {
        getVillainPlayerDataFromServer((err, data) => {
            dispatch(mapVillainMovementToState(data));
        });
    }
}

export function getPlayerFromServerName() {
    const state = getState();
    const { playerName, playerId } = state.playerState;

    return (dispatch) => {
        if (playerId) {
            dispatch(initPaddle({
                playerId,
                playerName,
            }))
        } else {
            getPlayerNumber((err, serverData) => {
                dispatch(initPaddle(serverData));
            });
        }
    }
}

export function sendPlayerIdToServer(localStoragePlayerData) {
    return (dispatch) => {
        sendDataToServer(localStoragePlayerData);
    }
}

export function getBallMovementFromServer() {
    return (dispatch) => {
        getBallMovement((err, serverData) => {
            dispatch(setPingBallDirection(serverData));
        });
    }
}
