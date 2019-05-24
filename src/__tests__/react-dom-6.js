import { getNodeText } from "dom-testing-library";

import React from "../react";
import ReactDOM from "../react-dom";
import { getExampleDOM } from "../test-utils";

test("Check rendering of p", async () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <p className="NDC">
      Hello world!
    </p>,
    container
  );

  expect(getNodeText(container.querySelector(".NDC"))).toEqual("Hello world!");
});
