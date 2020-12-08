import { getNodeText, fireEvent, waitFor } from '@testing-library/dom';

import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'world' };
  }

  render() {
    const { name } = this.state;
    const { newState } = this.props;
    return (
      <div>
        <p>Hello {name}</p>
        <button onClick={ () => this.setState(newState) }>
          Expand your horizon
        </button>
      </div>
    );
  }
}

test('Check state updates correctly updates the DOM (fails with timeout if ReactDOM._reRender does not correctly defer rendering)', async () => {
  const container = getExampleDOM();

  ReactDOM.render(<Greeting newState={ { name: 'universe' } } />, container);

  expect(getNodeText(container.querySelector('p'))).toBe('Hello world');

  fireEvent(
    container.querySelector('button'),
    new MouseEvent('click')
  );

  await waitFor(() => { expect(getNodeText(container.querySelector('p'))).toBe('Hello universe') });
});
