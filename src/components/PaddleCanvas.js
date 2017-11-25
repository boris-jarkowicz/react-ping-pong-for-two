import React, { Component } from 'react';

class PaddleCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasWidth: this.props.canvasWidth,
            canvasHeight: this.props.canvasHeight,
            xPos: this.props.xPos,
            yPos: this.props.yPos,
        };
    }

    componentDidMount() {
        this.createCanvas();
    }

    componentDidUpdate() {
        this.createCanvas();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);

        this.setState({
            canvasWidth: this.props.canvasWidth,
            canvasHeight: this.props.canvasHeight,
            xPos: this.props.xPos,
            yPos: this.props.yPos,
        });

        console.log('componentWillReceiveProps', this.state);
    }

    createCanvas(clear) {
        const ctx = this.refs.canvas.getContext('2d');
        console.log('new update', this.state);
        ctx.clearRect(this.state.xPos, this.state.yPos, this.state.canvasWidth, this.state.canvasHeight);
        ctx.fillStyle = 'transparent';

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
