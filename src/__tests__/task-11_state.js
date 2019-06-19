import React from '../react';
import '../test-utils';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'world', moreState: 'right here' };
  }

  render() {
    const { name } = this.state;
    return <p>Hello {name}</p>;
  }
}

test('Check Component correctly updates state', () => {
  const element = new Greeting();

  element.setState({ name: 'universe' });

  expect(element.state.name).toBe('universe');
});

test('Check Component only changes given state', () => {
  const element = new Greeting();

  element.setState({ name: 'universe' });

  expect(element.state.name).toBe('universe');
  expect(element.state.moreState).toBe('right here');
});

test('Check Component does not change state if new state is null', () => {
  const element = new Greeting();

  element.setState(null);

  expect(element.state.name).toBe('world');
  expect(element.state.moreState).toBe('right here');
});
