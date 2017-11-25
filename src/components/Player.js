import React, { Component } from 'react';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoving: false,
            moveTo: 0,
        };
        this.bindKeyPressEventListener.bind(this);
        this.moveUpOrDown.bind(this);
    }

    bindKeyPressEventListener() {
        document.addEventListener('keydown', (event) => {
            console.log(event);
            this.moveUpOrDown(event.keyCode);
        });
    }

    componentWillMount() {
        this.bindKeyPressEventListener();
    }

    moveUpOrDown(keyCode) {
        const isMoving = keyCode === 40 || keyCode === 38;
        const moveUp = keyCode === 38;
        const moveDown = keyCode === 40;
        const moveTo = isMoving && moveUp ? this.state.moveTo + 5 :
                            isMoving && moveDown ? this.state.moveTo - 5 : this.state.moveTo + 0;

        this.setState({
            isMoving,
            moveTo,
        }, () => console.log('STATE', this.state));
    }

    render() {
        return (
            <div className="player">
                Player
            </div>
        )
    }
}
// 40 down 38 up
export default Player;
