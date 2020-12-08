import { fireEvent } from '@testing-library/dom';

import React from '../react';
import ReactDOM from '../react-dom';
import { getExampleDOM } from '../test-utils';

test('Check rendering with an event listener', async () => {
  const container = getExampleDOM();
  const onClick = jest.fn();

  ReactDOM.render(
    <button onClick={ onClick }>
      Hello world!
    </button>,
    container
  );

  fireEvent(
    container.querySelector('button'),
    new MouseEvent('click')
  );

  expect(onClick).toHaveBeenCalled();
});
