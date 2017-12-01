import {
    GET_INITIAL_PLAYER_MOVEMENT,
    GET_PADDLE_SIZE,
    MOVE_PADDLE,
} from '../actions/actions';

const initialState = {
    moveToYPos: 0,
    movementSpeed: 25,
};

export default (state = initialState, { type, payload }) => {
    //console.log('REDUCER ACTION TYPE', type);
    switch(type) {

        case GET_PADDLE_SIZE: {
            return {
                canvasWidth: 20,
                canvasHeight: 150,
                xPos: Math.round(window.innerWidth - 20),
                yPos: Math.round(window.innerHeight / 2 - 150 / 2),
                moveToYPos: 0,
                movementSpeed: 25,
                jailBox: 20,
            }
        }

        case GET_INITIAL_PLAYER_MOVEMENT: {
            return {
                ...state,
                initialState,
            }
        }

        case MOVE_PADDLE: {
            const allowedToMoveDown = state.yPos + state.canvasHeight < window.innerHeight - state.jailBox;
            const allowedToMoveUp = state.yPos - state.jailBox > 0;

            return {
                ...state,
                yPos: payload.moveUp && allowedToMoveUp
                ? state.yPos + -Math.abs(state.movementSpeed)
                :
                payload.moveDown && allowedToMoveDown
                ? state.yPos + state.movementSpeed : state.yPos + 0,
            }
        }

        default: {
            return state;
        }
    }
}
