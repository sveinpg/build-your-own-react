import Component from './Component';

const createElement = (type, props, ...children) => ({
    $$typeof: Symbol.for('react.element'),
    type: type,
    props: {
        children: children.flat(1),
        ...props
    },
    ref: null,
    _owner: null
});

export default {
    createElement: createElement,
    Component: Component
};
