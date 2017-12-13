import { getDataFromServer } from '../../client';

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

export function mapVillainMovementToState(data) {
    console.log('mapVillainMovementToState ACTION SYNC', data);
    const villainPosition = data ? data.yPos : 0;
    return {
        type: GET_VILLAIN_MOVEMENT,
        payload: {
            yPos: villainPosition,
        }
    };
}

export function getVillainData() {
    console.log('GETTING VILLAIN DATA ACTION');
    return dispatch => {
        getDataFromServer((err, data) => {
            console.log('VILLAIN ASYNC CALLBACK', data);
            dispatch(mapVillainMovementToState(data));
        });
    }
}
