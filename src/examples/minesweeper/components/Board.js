import React from '../../../solution/react';
import Square from './Square';

class Board extends React.Component {
    getBorderColor(displayValue) {
        var borderColor = '#E3E3E3';

        var colors = [
            '#5D1052',
            '#800080',
            '#ce325f',
            '#AE72FF',
            '#F132FF',
            '#ff7c80',
            '#DD93BD',
            '#fbd4b4'
        ];

        if (this.props.isGameOver === true) {
            if (displayValue === 'm') {
                borderColor = '#C97C81';
            } else {
                borderColor = '#E3E3E3';
            }
        } else if (this.props.isGameWon === true) {
            borderColor = '#6d8fe6';
        } else if (displayValue === null) {
            borderColor = '#E3E3E3';
        } else if (displayValue === 'f') {
            borderColor = '#17AD90';
        } else if (displayValue < 9 && displayValue > 0)
            borderColor = colors[8 - displayValue];
        else if (displayValue === '')
            //No mines nearby
            borderColor = '#f4f4f4';

        return borderColor;
    }

    getFillColor(displayValue) {
        var fillColor = '#E3E3E3'; //default background color

        if (this.props.isGameOver === true) {
            fillColor = '#e33912';
        } else if (this.props.isGameWon === true) {
            fillColor = '#add8e6';
        } else if (displayValue !== null) {
            fillColor = '#f4f4f4';
        }

        return fillColor;
    }

    //Create one row of squares
    renderRow(rowIndex) {
        return (
            <div className="board-row" key={rowIndex}>
                {this.props.displayedSquares[rowIndex].map(
                    (square, columnIndex) => {
                        var displayValue = this.props.displayedSquares[
                            rowIndex
                        ][columnIndex];
                        var borderColor = this.getBorderColor(displayValue);
                        var fillColor = this.getFillColor(displayValue);

                        return (
                            <Square
                                row={rowIndex}
                                column={columnIndex}
                                valueToDisplay={displayValue}
                                borderColor={borderColor}
                                fillColor={fillColor}
                                onClick={e =>
                                    this.props.onClick(e, columnIndex, rowIndex)
                                }
                                key={
                                    rowIndex * this.props.columnsNumber +
                                    columnIndex
                                }
                            />
                        );
                    }
                )}
            </div>
        );
    }

    render() {
        var boardRows = new Array(this.props.rowsNumber);

        for (var rowIndex = 0; rowIndex < this.props.rowsNumber; rowIndex++) {
            //create all rows
            boardRows.push(this.renderRow(rowIndex));
        }

        return <div>{boardRows}</div>;
    }
}

export default Board;
