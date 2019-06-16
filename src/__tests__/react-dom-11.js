import { getNodeText } from 'dom-testing-library';

import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

class Greeting extends React.Component {
  render() {
    const { name } = this.props;
    return <p>Hello {name}</p>;
  }
}

test('Check Component has prototype isReactComponent', async () => {
  expect(React.Component.prototype.isReactComponent).toEqual(true);
});

test('Check Component sets props', async () => {
  const container = getExampleDOM();

  ReactDOM.render(<Greeting name='world' />, container);

  expect(getNodeText(container.querySelector('p'))).toBe('Hello world');
});
