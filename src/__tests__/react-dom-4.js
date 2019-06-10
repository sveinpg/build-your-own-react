import { getNodeText } from "dom-testing-library";

import React from "../solution/react";
import ReactDOM from "../solution/react-dom";
import { getExampleDOM } from "../test-utils";

test("Check rendering of a primitive type child", async () => {
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

  expect(getNodeText(container.querySelector("div"))).toBe("Hello universe");
  expect(getNodeText(container.querySelector("p"))).toBe("Hello world");
});
