import React from '../../../solution/react';

function Square(props) {
    if (props.valueToDisplay === 'f') {
        return (
            <img
                src="https://cdn.rawgit.com/ofirdagan/build-your-own-react/2e8bad05/v5-examples/v5-step2-minesweeper/assets/black_flag.svg"
                width="20"
                height="20"
            />
        );
    } else if (props.valueToDisplay === 'm') {
        return (
            <img
                src="https://cdn.rawgit.com/ofirdagan/build-your-own-react/2e8bad05/v5-examples/v5-step2-minesweeper/assets/bomb.svg"
                width="20"
                height="20"
            />
        );
    } else {
        return props.valueToDisplay;
    }
}

function SquareButton(props) {
    var border = '5px solid' + props.borderColor;
    var fill = props.fillColor;

    return (
        <button
            className="square"
            onClick={e => props.onClick(e)}
            style={{
                border: border,
                background: fill
            }}
        >
            <Square valueToDisplay={props.valueToDisplay} />
        </button>
    );
}

export default SquareButton;
