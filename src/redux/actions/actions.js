export const GET_PLAYER_MOVEMENT_FROM_STATE = 'GET_PLAYER_MOVEMENT_FROM_STATE';
export const SEND_PLAYER_MOVEMENT_TO_SERVER = 'SEND_PLAYER_MOVEMENT_TO_SERVER';
export const GET_PLAYER_MOVEMENT_FROM_SERVER = 'GET_PLAYER_MOVEMENT_FROM_SERVER';
export const IS_PLAYER_CONNECTED = 'IS_PLAYER_CONNECTED';

export function getPlayerMovementFromState(playerState = {}) {
    return {
        type: GET_PLAYER_MOVEMENT_FROM_STATE,
        payload: playerState,
    };
}

export function sendPlayerMovementToServer(playerState = {}) {
    return {
        type: SEND_PLAYER_MOVEMENT_TO_SERVER,
        payload: playerState,
    };
}

export function getPlayerMovementFromServer(serverData) {
    return {
        type: GET_PLAYER_MOVEMENT_FROM_SERVER,
        payload: serverData,
    };
}

export function isPlayerConnected(serverData) {
    return {
        type: IS_PLAYER_CONNECTED,
        payload: serverData,
    };
}
