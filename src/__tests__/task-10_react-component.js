import { getNodeText } from 'dom-testing-library';

import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

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

test('Check Component render method returns React element', async () => {
  const instance = new Greeting();
  const element = instance.render();

  expect(element.props.children).toEqual(['Hello world']);
});

test('Check React Component throws error if used directly', async () => {
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

test('Check Component has prototype isReactComponent', async () => {
  expect(React.Component.prototype.isReactComponent).toEqual(true);
});

test('Check Component sets props', async () => {
  const container = getExampleDOM();

  ReactDOM.render(<GreetingWithProps name='world' />, container);

  expect(getNodeText(container.querySelector('p'))).toBe('Hello world');
});

