import React from "./react";
import ReactDOM from "./reactDOM";

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  onPlusClick() {
    this.setState({value: this.state.value + 1});
  };

  onMinusClick() {
    this.setState({value: this.state.value - 1});
  };

  render() {
    return (
      <div>
        <div style={ { color: 'red', marginTop: '20px' } }>The Famous Dan Abramov's Counter</div>
        <div>{this.state.value}</div>
        <button onClick={ this.onPlusClick.bind(this) }>+</button>
        <button onClick={ this.onMinusClick.bind(this) }>-</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
