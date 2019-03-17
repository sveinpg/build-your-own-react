export const createElement = (type, props, ...children) => ({
  $$typeof: Symbol.for("react.element"),
  type: type,
  props: {
    children,
    ...props
  },
  ref: null,
  _owner: null
});

module.exports = {
  createElement: createElement
};
