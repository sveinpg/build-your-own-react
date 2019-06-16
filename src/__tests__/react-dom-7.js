import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

test('Check rendering with inline styling', async () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <p style={ { color: 'red' } }>
      Hello world!
    </p>,
    container
  );

  expect(container.querySelector('[style="color: red;"]')).not.toBeNull();
});
