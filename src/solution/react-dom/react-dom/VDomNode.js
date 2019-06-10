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
        return this.getDomNode();
    }

    getDomNode() {
        return this.domNode;
    }

    getCurrentReactElement() {
        return this.currentReactElement;
    }

    update(nextReactElement) {
        const {
            props: { children: currentChildren = {} } = {},
        } = this.currentReactElement || {};

        const {
            props: nextProps = {},
        } = nextReactElement || {};

        const {
            children: nextChildren = []
        } = nextProps;

        const nextChildrenVNodes = [];
        const maxSize = Math.max(nextChildren.length, currentChildren.length);
        for (let i=0; i<maxSize; i++) {
            const nextChild = nextChildren[i];
            const currentChild = currentChildren[i];

            const isNextChildDefined = !VDomNode.isEmpty(nextChild);
            const isCurrentChildDefined = !VDomNode.isEmpty(currentChild);
            const isTypeDefined = isNextChildDefined
                && isCurrentChildDefined
                && nextChild.type
                && currentChild.type;

            if (isTypeDefined && nextChild.type === currentChild.type) {
                const vNode = this.childrenVNodes[i];
                nextChildrenVNodes.push(vNode);
                vNode.update(nextChild);
            } else if (!isNextChildDefined && isCurrentChildDefined) {
                const vNode = this.childrenVNodes[i];
                this.domNode.removeChild(vNode.getDomNode());
            } else if (isNextChildDefined && !isCurrentChildDefined) {
                const vNode = instantiateVNode(nextChild);
                nextChildrenVNodes.push(vNode);
                this.domNode.appendChild(vNode.mount());
            } else {
                const vNode = instantiateVNode(nextChild);
                nextChildrenVNodes.push(vNode);
                this.domNode.replaceChild(vNode.mount(), this.childrenVNodes[i].getDomNode());
            }
        }

        VDomNode.setAttributes(this.getDomNode(), nextProps);

        this.childrenVNodes = nextChildrenVNodes;
        this.currentReactElement = nextReactElement;
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
