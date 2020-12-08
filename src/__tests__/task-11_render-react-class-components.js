import { getNodeText } from '@testing-library/dom';

import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

class GreetingWithProps extends React.Component {
  render() {
    const { name } = this.props;
    return <p>Hello {name}</p>;
  }
}

test('Check that class components render', async () => {
  const container = getExampleDOM();

  ReactDOM.render(<GreetingWithProps name='world' />, container);

  expect(getNodeText(container.querySelector('p'))).toBe('Hello world');
});

