import ReactDOM from './reactDOM';

const createElement = (type, props, ...children) => ({
  $$typeof: Symbol.for("react.element"),
  type: type,
  props: {
    children,
    ...props
  },
  ref: null,
  _owner: null
});

class Component {
  constructor(props) {
    this.props = props;
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    ReactDOM.__reRender();
  }
}

module.exports = {
  createElement: createElement,
  Component: Component
};
