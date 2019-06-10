import React from "../solution/react";
import "../test-utils";

class Greeting extends React.Component {
  render() {
    return <p>Hello world</p>;
  }
}

test("Check Component render method returns React element", async () => {
  const instance = new Greeting();
  const element = instance.render();

  expect(element.props.children).toEqual(["Hello world"]);
});

test("Check React Component throws error if used directly", async () => {
  const instance = new React.Component();

  expect(instance.render).not.toBeUndefined();
  expect(typeof instance.render).toBe("function");

  let error;
  try {
    instance.render();
  } catch (e) {
    error = e;
  }

  expect(error instanceof Error).toBe(true);
});
