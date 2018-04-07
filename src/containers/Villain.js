import React from 'react';
import { connect } from 'react-redux';
import PaddleCanvas from '../components/PaddleCanvas';

const Villain = (props) => {
    return (
        <PaddleCanvas
            className={'canvasWrapper--villain'}
            canvasWidth={props.canvasWidth}
            canvasHeight={props.canvasHeight}
            xPos={props.xPos}
            yPos={props.yPos}
            color={props.paddleColor}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        ...state.villainState,
    };
};

export default connect(
    mapStateToProps
)(Villain);
