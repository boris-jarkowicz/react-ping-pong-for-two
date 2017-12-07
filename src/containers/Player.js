import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    movePaddle,
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

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);

    return {
        ...state.playerProps,
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        onKeyPress: (event) => {
            dispatch(movePaddle(event.keyCode));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
