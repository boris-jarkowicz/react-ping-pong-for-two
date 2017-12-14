import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    movePaddle,
    getVillainData,
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

    componentDidMount() {
        this.props.listenForVillain();
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
                color={this.props.paddleColor}
            />

        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps PLAYER', state);

    return {
        ...state.playerState,
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        onKeyPress: (event) => {
            dispatch(movePaddle(event.keyCode));
        },
        listenForVillain: () => {
            window.setTimeout(() => {
                dispatch(getVillainData())
            }, 16);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
