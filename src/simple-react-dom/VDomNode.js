import { instantiateVNode } from './index';

export default class VDomNode {
    static isEmpty(reactElement) {
        return reactElement === undefined || reactElement == null;
    }

    static isPrimitive(reactElement) {
        return !reactElement.type &&
            (typeof reactElement === 'string' || typeof reactElement === 'number');
    }

    static getChildrenAsArray(props) {
        const { children = [] } = props || {};
        return !Array.isArray(children) ? [children] : children;
    }

    static setAttributes(domNode, props = {}) {
        const {
            className,
            style,
            ...restProps
        } = props;

        // Set className
        if (className) {
            domNode.className = className;
        }

        // Set styles
        if (style) {
            Object.entries(style).forEach(([key, value]) => {
                domNode.style[key] = value;
            });
        }

        // Add event listeners and other props
        Object.entries(restProps).forEach(([key, value]) => {
            if (/^on.*$/.test(key)) {
                domNode.addEventListener(key.substring(2).toLowerCase(), value);
            } else if (key !== 'children') {
                domNode.setAttribute(key, value);
            }
        });
    }

    static buildDomNode(reactElement) {
        if (VDomNode.isEmpty(reactElement)) {
            return document.createTextNode(''); // Empty node
        }

        if (VDomNode.isPrimitive(reactElement)) {
            return document.createTextNode(reactElement);
        }

        const {
            type,
            props,
        } = reactElement;

        const domNode = document.createElement(type);
        VDomNode.setAttributes(domNode, props);

        return domNode;
    }

    constructor(reactElement) {
        this.currentReactElement = reactElement;
        this.domNode = null;
        this.childrenVNodes = [];
    }

    getPublicInstance() {
        return this.domNode;
    }

    mount() {
        const { props } = this.currentReactElement || {};

        this.domNode = VDomNode.buildDomNode(this.currentReactElement);
        this.childrenVNodes = VDomNode.getChildrenAsArray(props).map(instantiateVNode);

        for (const childVNode of this.childrenVNodes) {
            const childDomNode = childVNode.mount();
            this.domNode.appendChild(childDomNode);
        }

        return this.domNode;
    }
}
