import React from '../react';
import ReactDOM, { instantiateVNode } from '../react-dom';
import { getExampleDOM } from '../test-utils';

test('Checks that instantiateVNode returns a VDomNode', () => {
  expect(instantiateVNode(<p />).constructor.name).toBe('VDomNode');
});

test('Check rendering of html element', async () => {
  const container = getExampleDOM();

  ReactDOM.render(
    <p />,
    container
  );

  expect(container.querySelector('p')).not.toBeNull();
});
