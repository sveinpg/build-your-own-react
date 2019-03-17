import React from "./react";
import ReactDOM from "./reactDOM";

const Message = ({ name }) => <p className="red">{name}</p>;

const Greeting = () => (
  <div>
    <Message name="test" />
    <Message name="abc" />
  </div>
);

ReactDOM.render(<Greeting />, document.getElementById("root"));
