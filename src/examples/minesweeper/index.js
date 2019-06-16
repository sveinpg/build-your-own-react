import React from '../react';
import ReactDOM from '../react-dom';

import Game from './components/Game';

class MineSweeperApp extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: 10,
            columns: 10,
            mines: 10,
            game: React.createElement(Game, {
                rows: 10,
                columns: 10,
                mines: 10
            })
        };
    }

    render() {
        const ActiveGame = this.state.game;
        return React.createElement('div', { className: 'app' }, ActiveGame);
    }
}
var t0 = performance.now();
ReactDOM.render(
    React.createElement(MineSweeperApp),
    document.getElementById('root')
);
var t1 = performance.now();
console.log('Call to first render took ' + (t1 - t0) + ' milliseconds.');
