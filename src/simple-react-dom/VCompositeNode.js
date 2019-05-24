import { instantiateVNode } from './index';

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
