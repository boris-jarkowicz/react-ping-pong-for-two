import React, { Component } from 'react';

class PaddleCanvas extends Component {
    constructor(props) {
        super(props);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.createCanvas = this.createCanvas.bind(this);
    }

    componentDidMount() {
        this.createCanvas();
    }

    componentDidUpdate() {
        this.createCanvas();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        this.clearCanvas();
    }

    clearCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(this.props.xPos, this.props.yPos, this.props.canvasWidth, this.props.canvasHeight);
    }

    createCanvas(clear) {
        const ctx = this.refs.canvas.getContext('2d');

        const {
            canvasWidth,
            canvasHeight,
            xPos,
            yPos,
        } = this.props;

        //console.log('CANVAS PROPS', this.props);
        ctx.fillStyle = 'green';
        ctx.fillRect(xPos, yPos, canvasWidth, canvasHeight);
    }

    render() {
        return (
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} />
        );
    }
}

export default PaddleCanvas;
