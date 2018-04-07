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
            color,
        } = this.props;
        console.log('PADDLE PROPS', this.props);
        ctx.fillStyle = color;
        ctx.fillRect(xPos, yPos, canvasWidth, canvasHeight);
    }

    render() {
        const classNameModifier = `canvasWrapper ${this.props.className}`;
        console.log('window.innerWidth', window.innerWidth);
        return (
            <div className={classNameModifier}>
                <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} />
            </div>
        );
    }
}

export default PaddleCanvas;
