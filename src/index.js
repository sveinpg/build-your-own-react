import React from "./react";
import ReactDOM from "./reactDOM";

//const Message = ({ name }) => <p className="red">{name}</p>;

class Message extends React.Component {
  render() {
    return <p className="red">{this.props.name}</p>;
  }
}

const Greeting = () => (
  <div>
    <Message name="test" />
    <Message name="abc" />
  </div>
);

ReactDOM.render(<Greeting />, document.getElementById("root"));
