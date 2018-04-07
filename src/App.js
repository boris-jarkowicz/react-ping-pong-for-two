import React, { Component } from 'react';
import Player from './containers/Player';
import Villain from './containers/Villain';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Player />
                <Villain />
            </div>
        );
    }
}

export default App;
