import { connect } from 'react-redux';
import {
    getPlayerMovementFromState,
    sendPlayerMovementToServer,
} from '../redux/actions';
import Player from '../components/Player';

const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps', state);
    console.log('mapStateToProps', ownProps);

    return {

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('mapDispatchToProps', ownProps);

    return {

    }
};

const handlePlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);

export default handlePlayer;
