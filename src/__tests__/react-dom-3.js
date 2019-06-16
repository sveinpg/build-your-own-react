import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

test('Check rendering of a child', async () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <p>
      <span />
    </p>,
    container
  );

  expect(container.querySelector('p')).not.toBeNull();
  expect(container.querySelector('span')).not.toBeNull();
});
