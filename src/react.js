import ReactDOM from "./reactDOM";

const createElement = (type, props, ...children) => ({
  $$typeof: Symbol.for("react.element"),
  type: type,
  props: {
    children: children.flat(1),
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
    // Do not rerender if setState is called with null or undefined
    if (state == null) {
      return;
    }

    if (typeof state === "function") {
      this.state = { ...this.state, ...state(this.state) };
    } else {
      this.state = { ...this.state, ...state };
    }

    ReactDOM.__reRender();
  }
}

Component.prototype.isReactComponent = {};

module.exports = {
  createElement: createElement,
  Component: Component
};
