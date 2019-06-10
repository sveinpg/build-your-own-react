import React from "../solution/react";
import "../test-utils";

test("Check creation of React elements", async () => {
  const element = React.createElement("p", { myProp: "myValue" }, "Hello world", "Isn't this fun?");

  expect(element["$$typeof"]).toBe(Symbol.for("react.element"));
  expect(element.props.children).toEqual([
    "Hello world",
    "Isn't this fun?",
  ]);
  expect(element.props.myProp).toBe("myValue");
});
