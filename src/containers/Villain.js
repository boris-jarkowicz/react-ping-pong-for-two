import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaddleCanvas from '../components/PaddleCanvas';

class Villain extends Component {
    constructor(props) {
        super(props);

        console.log('VILLAIN PROPS', this.props);
    }

    componentDidMount() {
        console.log('componentDidMount Villain');
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
    console.log('mapStateToProps VILLAIN', state);

    return {
        ...state.villainProps,
    };
};
/*
const mapDispatchToProps = (dispatch) => {

    return {
        onKeyPress: (event) => {
            dispatch(movePaddle(event.keyCode));
        },
    }
};
*/
export default connect(
    mapStateToProps
)(Villain);
