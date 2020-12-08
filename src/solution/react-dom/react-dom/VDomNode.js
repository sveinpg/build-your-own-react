import { instantiateVNode } from './index';

export default class VDomNode {
    static isTypeDefined(reactElement) {
        return !VDomNode.isEmpty(reactElement) && reactElement.type;
    }

    static isEmpty(reactElement) {
        return reactElement === undefined || reactElement === null;
    }

    static isPrimitive(reactElement) {
        return !reactElement.type &&
            (typeof reactElement === 'string' || typeof reactElement === 'number');
    }

    static getChildrenAsArray(props) {
        const { children = [] } = props || {};
        return !Array.isArray(children) ? [children] : children;
    }

    static setAttributes(domNode, nextProps = {}, prevProps = {}) {
        const {
            className: prevClass,
            style: prevStyle = {},
            ...prevRestProps
        } = prevProps;

        const {
            className,
            style = {},
            ...restProps
        } = nextProps;

        // Set className
        if (className) {
            domNode.className = className;
        }

        // Remove outdated styles
        Object.keys(prevStyle)
          .filter(key => !style[key])
          .forEach((key) => {
              domNode.style[key] = '';
          });

        // Set styles
        Object.entries(style).forEach(([key, value]) => {
            domNode.style[key] = value;
        });


        // Remove outdated event listeners and other props
        Object.entries(prevRestProps)
          .filter(([key]) => !restProps[key])
          .forEach(([key, value]) => {
              if (key === 'children') {
                  return;
              }

              if (/^on.*$/.test(key)) {
                  domNode.removeEventListener(key.substring(2).toLowerCase(), value);
              } else if (key === 'value') {
                  domNode.value = '';
              } else {
                  domNode.removeAttribute(key);
              }
          });

        // Add event listeners and other props
        Object.entries(restProps).forEach(([key, value]) => {
            if (key === 'children') {
                return;
            }

            if (/^on.*$/.test(key)) {
                const event = key.substring(2).toLowerCase();

                // Remove previous event listener for same event or else we will have two listeners for the same event
                if (prevProps[key]) {
                    domNode.removeEventListener(event, prevRestProps[key]);
                }
                domNode.addEventListener(event, value);
            } else if (key === 'value') {
                domNode.value = value;
            } else {
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
            props: prevProps = {},
        } = this.currentReactElement || {};

        const {
            children: currentChildren = {},
        } = prevProps;

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
            const isTypeDefined = VDomNode.isTypeDefined(nextChild) && VDomNode.isTypeDefined(currentChild);

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

        VDomNode.setAttributes(this.getDomNode(), nextProps, prevProps);

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
