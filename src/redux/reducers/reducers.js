import {
    GET_PLAYER_MOVEMENT_FROM_STATE,
    SEND_PLAYER_MOVEMENT_TO_SERVER,
} from '../actions/actions';

const initialState = {
    playerMovement: 0,
    playerData: {},
};

export default (state = initialState, { type, payload }) => {
    console.log(payload);
    switch(type) {
        case GET_PLAYER_MOVEMENT_FROM_STATE: {
            return {
                ...state,
                moveToYPos: payload.playerMovement,
            }
        }

        case SEND_PLAYER_MOVEMENT_TO_SERVER: {
            return {
                ...state,
                playerData: {},
            }
        }

        default: {
            return state;
        }
    }
}
