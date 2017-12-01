import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    movePaddle,
    allowMovement,
} from '../redux/actions/actions';
import PaddleCanvas from '../components/PaddleCanvas';

class Player extends Component {
    constructor(props) {
        super(props);
        this.bindKeyPressEventListener.bind(this);

        console.log('PLAYER PROPS', this.props);
    }

    bindKeyPressEventListener() {
        document.addEventListener('keydown', this.props.onKeyPress);
    }

    componentWillMount() {
        this.bindKeyPressEventListener();
    }

    render() {
        return (
            <PaddleCanvas
                canvasWidth={this.props.canvasWidth}
                canvasHeight={this.props.canvasHeight}
                xPos={this.props.xPos}
                yPos={this.props.yPos}
            />

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps ownProps', ownProps);
    console.log('mapStateToProps', state);

    return {
        ...state,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('mapDispatchToProps ownProps', ownProps);

    return {
        onKeyPress: (event) => {
            dispatch(movePaddle(event.keyCode));
        },
        toMoveOrNotToMove: (bool) => {
            dispatch(allowMovement(bool));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
