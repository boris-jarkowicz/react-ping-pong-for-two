import {
    GET_PADDLE_SIZE,
    MOVE_PADDLE,
    GET_VILLAIN_MOVEMENT
} from '../actions/actions';

const initialState = {
    playerProps: {
        canvasWidth: 20,
        canvasHeight: 150,
        xPos: Math.round(window.innerWidth - 20),
        yPos: Math.round(window.innerHeight / 2 - 150 / 2),
        movementSpeed: 25,
        jailBox: 20,
        paddleColor: 'green',
    },
    villainProps: {
        canvasWidth: 20,
        canvasHeight: 150,
        xPos: 0,
        yPos: Math.round(window.innerHeight / 2 - 150 / 2),
        movementSpeed: 25,
        jailBox: 20,
        paddleColor: 'purple',
    }
};

export default (state = initialState, { type, payload }) => {
    //console.log('REDUCER ACTION TYPE', type);
    switch(type) {

        case GET_PADDLE_SIZE: {
            return {
                ...state,
            }
        }

        case MOVE_PADDLE: {
            console.log('REDUCER: MOVE_PADDLE', state);

            const {
                yPos,
                canvasHeight,
                jailBox,
                movementSpeed
            } = state.playerProps;

            const allowedToMoveDown = yPos + canvasHeight < window.innerHeight - jailBox;
            const allowedToMoveUp = yPos - jailBox > 0;

            const newPos = payload.moveUp && allowedToMoveUp ?
                            yPos + -Math.abs(movementSpeed)
                            : payload.moveDown && allowedToMoveDown
                            ? yPos + movementSpeed : yPos + 0;

            state.playerProps.yPos = newPos;
            return {
                ...state,
            }
        }

        case GET_VILLAIN_MOVEMENT: {
            console.log('REDUCER yPosVillain', payload);
            return {
                ...state,
                payload,
            }
        }

        default: {
            return state;
        }
    }
}
