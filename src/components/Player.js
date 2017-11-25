import React, { Component } from 'react';
import PaddleCanvas from './PaddleCanvas';

const canvasWidth = 20;
const canvasHeight = 150;
const xPos = Math.round(window.innerWidth - canvasWidth);
const yPos = Math.round(window.innerHeight / 2 - canvasHeight / 2);

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToYPos: yPos,
            movementSpeed: 25,
        };
        this.bindKeyPressEventListener.bind(this);
        this.moveUpOrDown.bind(this);
    }

    bindKeyPressEventListener() {
        document.addEventListener('keydown', (event) => {
            this.moveUpOrDown(event.keyCode);
        });
    }

    componentWillMount() {
        this.bindKeyPressEventListener();
    }

    calculateYPos(operator) {
        const newPos = this.state.moveToYPos + (operator);
        const jailBox = 20;

        if (newPos + canvasHeight >= window.innerHeight - jailBox || newPos - jailBox <= 0) {
            return this.state.moveToYPos;
        }

        return this.state.moveToYPos + (operator);
    }

    moveUpOrDown(keyCode) {
        const isMoving = keyCode === 40 || keyCode === 38;
        const moveUp = keyCode === 38 && isMoving;
        const moveDown = keyCode === 40 && isMoving;
        const direction = moveUp ? -Math.abs(this.state.movementSpeed) : moveDown ? this.state.movementSpeed : 0;

        const moveToYPos = this.calculateYPos(direction);

        this.setState({
            moveToYPos,
        }, () => console.log('STATE', this.state));
    }

    render() {
        return (
            <PaddleCanvas
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                xPos={xPos}
                yPos={this.state.moveToYPos}
            />

        )
    }
}

export default Player;
