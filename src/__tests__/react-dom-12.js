import { getNodeText, fireEvent, waitForDomChange } from "dom-testing-library";

import React from "../react";
import ReactDOM from "../react-dom";
import { getExampleDOM } from "../test-utils";

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "world" };
  }

  render() {
    const { name } = this.state;
    const { newState } = this.props;
    return (
      <div>
        <p>Hello {name}</p>
        <button onClick={ () => this.setState(newState) }>
          Expand your horizon
        </button>
      </div>
    );
  }
}

test("Check Component correctly updates state", async () => {
  const container = getExampleDOM();

  ReactDOM.render(<Greeting newState={ { name: "universe" } } />, container);

  expect(getNodeText(container.querySelector("p"))).toBe("Hello world");

  fireEvent(
    container.querySelector("button"),
    new MouseEvent("click")
  );

  await waitForDomChange({ container });

  expect(getNodeText(container.querySelector("p"))).toBe("Hello universe");
});

test("Check DOM isn't re-rendered if setState is called with null", async done => {
  const container = getExampleDOM();

  ReactDOM.render(<Greeting newState={ null } />, container);

  fireEvent(
    container.querySelector("button"),
    new MouseEvent("click")
  );

  try {
    await waitForDomChange({ container, timeout: 100 });
    done.fail("Calling setState with null should not trigger a re-render");
  } catch {
    // We expect to catch a timeout
  }

  done();
});
