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
        ctx.globalCompositeOperation = 'destination-out';
    }

    createCanvas(clear) {
        const ctx = this.refs.canvas.getContext('2d');
        const {
            xPos,
            yPos,
            color,
        } = this.props;

        ctx.beginPath();
        ctx.arc(75, 50, 25, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }

    render() {
        return (
            <div className="canvasWrapper">
                <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} />
            </div>
        );
    }
}

export default PaddleCanvas;
