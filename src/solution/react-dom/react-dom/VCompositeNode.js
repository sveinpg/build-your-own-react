import { instantiateVNode } from './index';
import VDomNode from './VDomNode';

export default class VCompositeNode {
    static isReactClassComponent(type) {
        return type.prototype && type.prototype.isReactComponent;
    }

    static isVCompositeNode(type) {
        return typeof type === 'function';
    }

    constructor(reactElement) {
        this.currentReactElement = reactElement;
        this.classInstance = null;
        this.renderedInstance = null;
    }

    getPublicInstance() {
        return this.classInstance;
    }

    getCurrentReactElement() {
        return this.currentReactElement;
    }

    getDomNode() {
        return this.renderedInstance.getDomNode();
    }

    update(nextReactElement) {
        const {
            type,
            props: nextProps,
        } = nextReactElement;

        const nextRenderedReactElement = (() => {
            if (VCompositeNode.isReactClassComponent(type)) {
                this.classInstance.props = nextProps;
                return this.classInstance.render();
            }
            return type(nextProps);
        })();

        const prevRenderedReactElement = this.renderedInstance.getCurrentReactElement();

        const isTypeDefined = VDomNode.isTypeDefined(prevRenderedReactElement)
            && VDomNode.isTypeDefined(nextRenderedReactElement);

        if (isTypeDefined && prevRenderedReactElement.type === nextRenderedReactElement.type) {
            this.renderedInstance.update(nextRenderedReactElement);
        } else {
            const nextRenderedInstance = instantiateVNode(nextRenderedReactElement);

            const prevDomNode = this.getDomNode();
            const nextDomNode = nextRenderedInstance.mount();
            prevDomNode.parentNode.replaceChild(nextDomNode, prevDomNode);

            this.renderedInstance = nextRenderedInstance;
        }
    }

    mount() {
        const {
            type,
            props,
        } = this.currentReactElement;

        if (VCompositeNode.isReactClassComponent(type)) {
            this.classInstance = new type(props);
            this.renderedInstance = instantiateVNode(this.classInstance.render());
        } else {
            this.classInstance = null;
            this.renderedInstance = instantiateVNode(type(props));
        }

        return this.renderedInstance.mount();
    }
}
