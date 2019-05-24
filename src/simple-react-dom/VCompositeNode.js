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
    }

    getPublicInstance() {
        return this.classInstance;
    }

    mount(classCache) {
        const {
            type,
            props,
        } = this.currentReactElement;

        let renderedInstance;
        if (VCompositeNode.isReactClassComponent(type)) {
            const cacheIndex = classCache.index++;

            const instance = classCache.cache[cacheIndex]
                ? classCache.cache[cacheIndex]
                : new type(props);

            classCache.cache[cacheIndex] = instance;
            renderedInstance = instantiateVNode(instance.render());

            this.classInstance = instance;
        } else {
            this.classInstance = null;

            renderedInstance = instantiateVNode(type(props));
        }

        return renderedInstance.mount(classCache);
    }
}
