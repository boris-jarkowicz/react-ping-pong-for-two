import React, { Component } from 'react';
import PingBallCanvas from '../components/PingBallCanvas';
import { connect } from 'react-redux';
import { getBallMovementFromServer } from '../redux/actions/actions';

class PingBall extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.listenForMovementDirections();
    }

    render() {
        return (
            <PingBallCanvas
                xPos={this.props.xPos}
                yPos={this.props.yPos}
                color={this.props.ballColor}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.ballState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listenForMovementDirections: () => {
            dispatch(getBallMovementFromServer())
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PingBall);
