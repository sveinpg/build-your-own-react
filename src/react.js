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
}

module.exports = {
  createElement: createElement,
  Component: Component
};
