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
            const cachedInstance = classCache.cache[cacheIndex];

            const instance = cachedInstance ? cachedInstance : new type(props);
            instance.props = props;

            classCache.cache[cacheIndex] = instance;

            renderedInstance = instantiateVNode(instance.render());
            this.classInstance = instance;
        } else {
            renderedInstance = instantiateVNode(type(props));
            this.classInstance = null;
        }

        return renderedInstance.mount(classCache);
    }
}
