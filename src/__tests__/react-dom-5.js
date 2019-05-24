import { getNodeText } from "dom-testing-library";

import React from "../react";
import ReactDOM from "../react-dom";
import { getExampleDOM } from "../test-utils";

test("Check rendering of p", async () => {
  const container = getExampleDOM();

  function Greeting(props) {
    return <p>Hello, {props.name}</p>;
  }

  ReactDOM.render(
    <Greeting name="NDC" />,
    container
  );

  expect(getNodeText(container.querySelector("p"))).toEqual("Hello, NDC");
});
