import React from 'react';
import { connect } from 'react-redux';
import PaddleCanvas from '../components/PaddleCanvas';

const Villain = (props) => {
    return (
        <PaddleCanvas
            canvasWidth={props.canvasWidth}
            canvasHeight={props.canvasHeight}
            xPos={props.xPos}
            yPos={props.yPos}
            color={props.paddleColor}
        />
    );
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps VILLAIN', state);

    return {
        ...state.villainProps,
    };
};

export default connect(
    mapStateToProps
)(Villain);
