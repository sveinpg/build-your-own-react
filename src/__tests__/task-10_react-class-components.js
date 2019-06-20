import React from '../react';
import '../test-utils';

class Greeting extends React.Component {
  render() {
    return <p>Hello world</p>;
  }
}

class GreetingWithProps extends React.Component {
  render() {
    const { name } = this.props;
    return <p>Hello {name}</p>;
  }
}

test('Check Component render method returns React element', () => {
  const instance = new Greeting();
  const element = instance.render();

  expect(element.props.children).toEqual(['Hello world']);
});

test('Check React Component throws error if used directly', () => {
  const instance = new React.Component();

  expect(instance.render).not.toBeUndefined();
  expect(typeof instance.render).toBe('function');

  let error;
  try {
    instance.render();
  } catch (e) {
    error = e;
  }

  expect(error instanceof Error).toBe(true);
});

test('Check Component has prototype isReactComponent', () => {
  expect(React.Component.prototype.isReactComponent).toEqual(true);
});

test('Check Component sets props', () => {
  const instance = new GreetingWithProps({ name: 'world' });
  const element = instance.render();

  expect(element.props.children).toEqual(['Hello ', 'world']);
});

