import React from '../../react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.rows = props.rows;
        this.columns = props.columns;
        this.minesNumber = props.mines;

        //two dimensional array. This will indicate whether the square contains a mine, and if not- how many mines surround it.
        this.squaresValues = null;

        //Draw random mines locations and fill all squaresValues.
        this.initBoard();

        this.state = {
            isGameOver: false,
            isGameWon: false,
            remainingFlags: this.minesNumber,

            //two dimensional array. This will indicate the value that is currently displayed in each square.
            displayedSquares: this.initDisplayedSquares()
        };
    }

    initBoard() {
        this.squaresValues = new Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
            this.squaresValues[i] = new Array(this.columns).fill(0);
        }
        //generate random mines
        this.generateRandomMines();

        //fill values for adjacent squares
        this.fillAdjacentValues();
    }

    generateRandomMines() {
        var totalSquaresNumber = this.columns * this.rows;
        var minesOnBoard = 0;

        while (minesOnBoard < this.minesNumber) {
            var index = Math.floor(Math.random() * totalSquaresNumber); // returns a number between 0 and number of squares
            if (
                this.squaresValues[Math.floor(index / this.columns)][
                    index % this.columns
                ] === 0
            ) {
                //square does not have a mine already
                this.squaresValues[Math.floor(index / this.columns)][
                    index % this.columns
                ] = 10; //10 value will represent a mine
                minesOnBoard++;
            }
        }
    }

    initDisplayedSquares() {
        var squaresValuesArray = new Array(this.rows);
        for (var i = 0; i < this.rows; i++) {
            squaresValuesArray[i] = new Array(this.columns).fill(null);
        }
        return squaresValuesArray;
    }

    fillAdjacentValues() {
        for (var i = 0; i < this.rows; i++) {
            //Go over all rows
            for (var j = 0; j < this.columns; j++) {
                //Go over all columns
                if (this.squaresValues[i][j] === 10) {
                    //a mine
                    //add to adjacent values
                    this.addToAdjacentSquaresValues(i, j);
                }
            }
        }
    }

    //Add to the values of all sqares that are adjacent to the mine
    addToAdjacentSquaresValues(row, column) {
        for (var k = -1; k <= 1; k++) {
            if (row + k < this.rows && row + k >= 0) {
                for (var l = -1; l <= 1; l++) {
                    if (column + l < this.columns && column + l >= 0) {
                        if (this.squaresValues[row + k][column + l] !== 10) {
                            this.squaresValues[row + k][column + l]++;
                        }
                    }
                }
            }
        }
    }

    handleClick(e, columnIndex, rowIndex) {
        //Cannot receive more clicks if game is over
        if (this.state.isGameOver || this.state.isGameWon) {
            return;
        }

        //If flag was requested
        if (
            e.shiftKey &&
            (this.state.displayedSquares[rowIndex][columnIndex] === null ||
                this.state.displayedSquares[rowIndex][columnIndex] === 'f')
        ) {
            this.handleFlag(rowIndex, columnIndex);
        }

        //Check if location has already been clicked (
        else if (this.state.displayedSquares[rowIndex][columnIndex] !== null) {
        }
        //Do nothing

        //Check if user clicked on mine
        else if (this.squaresValues[rowIndex][columnIndex] === 10) {
            this.addToDisplayedSquares(rowIndex, columnIndex, 'm');

            this.setState({ isGameOver: true });

            this.gameOver();
        }

        //Show square value
        else {
            this.revealAdjacentMinesNumber(rowIndex, columnIndex);
        }
    }

    //Display a specific value in a specific square
    addToDisplayedSquares(row, column, value) {
        const displayedSquares = this.state.displayedSquares.slice();
        displayedSquares[row][column] = value;
        var t0 = performance.now();
        this.setState({
            displayedSquares: displayedSquares
        });
        var t1 = performance.now();
        console.log(
            'Call to set state displayedSquares took ' +
                (t1 - t0) +
                ' milliseconds.'
        );
    }

    revealAdjacentMinesNumber(rowIndex, columnIndex) {
        //Already visited this cell
        if (
            this.state.displayedSquares[rowIndex][columnIndex] === '' ||
            this.state.displayedSquares[rowIndex][columnIndex] === 'f'
        ) {
            return;
        }

        //There are mines nearby
        if (
            this.squaresValues[rowIndex][columnIndex] > 0 &&
            this.squaresValues[rowIndex][columnIndex] <= 9
        ) {
            this.addToDisplayedSquares(
                rowIndex,
                columnIndex,
                this.squaresValues[rowIndex][columnIndex]
            );
            return;
        }

        //If no mines nearby, check adjacent cells
        else if (this.squaresValues[rowIndex][columnIndex] === 0) {
            this.addToDisplayedSquares(rowIndex, columnIndex, ''); //This will indicate that the cell was visited
            this.checkNeighboursAdjacentMinesNumber(rowIndex, columnIndex);
        }

        return;
    }

    checkNeighboursAdjacentMinesNumber(row, column) {
        for (var i = -1; i <= 1; i++) {
            if (row + i < this.rows && row + i >= 0) {
                for (var j = -1; j <= 1; j++) {
                    if (column + j < this.columns && column + j >= 0) {
                        this.revealAdjacentMinesNumber(row + i, column + j);
                    }
                }
            }
        }
    }

    gameOver() {
        //show all mines on board
        const displayedSquares = this.state.displayedSquares.slice();

        for (var i = 0; i < this.rows; i++) {
            //Go over all rows
            for (var j = 0; j < this.columns; j++) {
                //Go over all columns
                if (this.squaresValues[i][j] === 10) {
                    displayedSquares[i][j] = 'm';
                }
            }
        }

        this.setState({
            displayedSquares: displayedSquares
        });
    }

    handleFlag(rowIndex, columnIndex) {
        //handle shift-click

        //Remove flag
        if (this.state.displayedSquares[rowIndex][columnIndex] === 'f') {
            this.addToDisplayedSquares(rowIndex, columnIndex, null);
            this.setState({
                remainingFlags: this.state.remainingFlags + 1
            });
        }

        //Add flag - if more flags are available
        else if (this.state.remainingFlags > 0) {
            this.addToDisplayedSquares(rowIndex, columnIndex, 'f');
            this.setState(
                {
                    remainingFlags: this.state.remainingFlags - 1
                },
                function() {
                    if (this.state.remainingFlags === 0) {
                        var isGameWon = this.IsGameWon();
                        if (isGameWon === true) {
                            this.setState({ isGameWon: true });
                        }
                    }
                }
            );
        }

        //No more flags available
        else {
            alert('You have no more available flags!');
        }
    }

    IsGameWon() {
        //Check if all the mines are flagged
        if (this.state.remainingFlags === 0) {
            for (var i = 0; i < this.rows; i++) {
                //Go over all rows
                for (var j = 0; j < this.columns; j++) {
                    //Go over all columns
                    if (
                        this.squaresValues[i][j] === 10 &&
                        this.state.displayedSquares[i][j] !== 'f'
                    ) {
                        //Mine is not flagged
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    render() {
        var boardWidth = Math.max(35 * this.props.columns, 350);

        return React.createElement(
            'div',
            { className: 'game', style: { maxWidth: boardWidth } },
            React.createElement(
                'div',
                { className: 'boardHeader' },
                React.createElement(
                    'h4',
                    { className: 'title' },
                    React.createElement(
                        'span',
                        { style: { color: '#DD93BD' } },
                        'M'
                    ),
                    React.createElement(
                        'span',
                        { style: { color: '#ff7c80' } },
                        'i'
                    ),
                    React.createElement(
                        'span',
                        { style: { color: '#F132FF' } },
                        'n'
                    ),
                    React.createElement(
                        'span',
                        { style: { color: '#fbd4b4' } },
                        'e'
                    ),
                    React.createElement(
                        'span',
                        { id: 'SweeperHeader' },
                        ' Sweeper '
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'flags-information' },
                    React.createElement('h1', null, this.state.remainingFlags),
                    React.createElement('img', {
                        src:
                            'https://cdn.rawgit.com/ofirdagan/build-your-own-react/2e8bad05/v5-examples/v5-step2-minesweeper/assets/black_flag.svg',
                        width: '30',
                        height: '30'
                    })
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(Board, {
                    displayedSquares: this.state.displayedSquares,
                    columnsNumber: this.columns,
                    rowsNumber: this.rows,
                    isGameOver: this.state.isGameOver,
                    isGameWon: this.state.isGameWon,
                    onClick: (e, columnIndex, rowIndex) =>
                        this.handleClick(e, columnIndex, rowIndex)
                })
            )
        );
    }
}

export default Game;
