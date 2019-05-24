import { getNodeText } from "dom-testing-library";

import React from "../react";
import ReactDOM from "../react-dom";
import { getExampleDOM } from "../test-utils";

test("Check rendering of p", async () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <div>
      Hello universe
      <p>
        Hello world
      </p>
    </div>,
    container
  );

  expect(getNodeText(container.querySelector("div"))).toEqual("Hello universe");
  expect(getNodeText(container.querySelector("p"))).toEqual("Hello world");
});
