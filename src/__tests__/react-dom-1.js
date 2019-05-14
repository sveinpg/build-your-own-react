import { getNodeText } from "dom-testing-library";
import "jest-dom/extend-expect";
import regeneratorRuntime from "regenerator-runtime";

import React from "../react";
import ReactDOM from "../reactDOM";

function getExampleDOM() {
  const div = document.createElement("div");
  div.id = "root";
  return div;
}

test("Check rendering of p", async () => {
  const container = getExampleDOM();

  ReactDOM.render(React.createElement("p", {}, "Hello world"), container);

  expect(getNodeText(container.querySelector("p"))).toEqual("Hello world");
});
