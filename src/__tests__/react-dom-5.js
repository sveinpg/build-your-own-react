import { getNodeText } from "dom-testing-library";

import React from "../solution/react";
import ReactDOM from "../solution/react-dom";
import { getExampleDOM } from "../test-utils";

test("Check rendering of a functional component with a prop", async () => {
  const container = getExampleDOM();

  function Greeting(props) {
    return <p>Hello, {props.name}</p>;
  }

  ReactDOM.render(
    <Greeting name="NDC" />,
    container
  );

  expect(getNodeText(container.querySelector("p"))).toBe("Hello, NDC");
});
