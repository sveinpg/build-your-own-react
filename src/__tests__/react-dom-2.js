import React from "../solution/react";
import ReactDOM from "../solution/react-dom";
import { getExampleDOM } from "../test-utils";

test("Check rendering of html element", async () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <p />,
    container
  );

  expect(container.querySelector("p")).not.toBeNull();
});
