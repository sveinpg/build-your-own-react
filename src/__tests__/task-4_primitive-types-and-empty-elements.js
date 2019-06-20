import { getNodeText } from 'dom-testing-library';

import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

test('Check rendering of empty child', () => {
    const container = getExampleDOM();

    ReactDOM.render(
        <div>
            {null}
        </div>,
        container
    );

    expect(container.querySelector('div').childNodes.length).toBe(1);
    expect(getNodeText(container.querySelector('div'))).toBe('');
});

test('Check rendering of a primitive type child', () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <div>
      Hello universe
      <p>
        Hello world
      </p>
    </div>,
    container
  );

  expect(getNodeText(container.querySelector('div'))).toBe('Hello universe');
  expect(getNodeText(container.querySelector('p'))).toBe('Hello world');
});
