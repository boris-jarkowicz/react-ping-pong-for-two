import React, { Component } from 'react';
import Player from './containers/Player';
import PaddleCanvas from './components/PaddleCanvas';
//import { subscribeToTimer } from './api';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        /*subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));*/
    }

    /*state = {
        timestamp: 'no timestamp yet'
    };*/

    render() {
        return (
            <div className="App">
                <Player />
                <PaddleCanvas />
            </div>
        );
    }
}

export default App;
