import {
    INIT_PADDLE,
    MOVE_PADDLE,
    GET_VILLAIN_MOVEMENT,
} from '../actions/actions';

const canvasWidth = 20;
const canvasHeight = 150;
const xPos = Math.round(window.innerWidth - 20);
const yPos = Math.round(window.innerHeight / 2 - 150 / 2);
const movementSpeed = 25;
const jailBox = 20;
const paddleColor = 'green';
const playerName = null;
const playerId = null;

const initialState = {
    playerProps: {
        canvasWidth,
        canvasHeight,
        xPos,
        yPos,
        movementSpeed,
        jailBox,
        paddleColor,
        playerName,
        playerId,
    },
    villainProps: {
        canvasWidth,
        canvasHeight,
        xPos: 0,
        yPos,
        movementSpeed,
        jailBox,
        paddleColor: 'purple',
        playerName,
        playerId,
    }
};

export default (state = initialState.playerProps, { type = '', payload = {} }) => {
    switch(type) {

        case INIT_PADDLE: {
            state.playerName = payload.playerData.playerName;
            state.playerId = payload.playerData.playerId;
            return {
                ...state,
            }
        }

        case MOVE_PADDLE: {
            state.yPos = payload.newPos;

            return {
                ...state,
            }
        }

        default: {
            return state;
        }
    }
};

export function villainState(state = initialState.villainProps, { type, payload }) {
    switch(type) {
        case GET_VILLAIN_MOVEMENT: {
            state.yPos = payload.yPos;
            return {
                ...state,
            }
        }

        default: {
            return state;
        }
    }
}
