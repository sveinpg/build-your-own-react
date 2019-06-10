import VCompositeNode from './VCompositeNode';
import VDomNode from './VDomNode';

const root = {};
const classCache = {
    index: -1,
    cache: []
};

export function instantiateVNode(reactElement) {
    const { type } = reactElement || {};

    if (VCompositeNode.isVCompositeNode(type)) {
        return new VCompositeNode(reactElement);
    }

    return new VDomNode(reactElement);
}

function render(
    reactElement = root.reactElement,
    domContainerNode = root.domContainerNode
) {
    if (root.domContainerNode) {
        domContainerNode.innerHTML = '';
        classCache.index = -1;
    }

    const vNode = instantiateVNode(reactElement);
    const domNode = vNode.mount(classCache);

    domContainerNode.appendChild(domNode);

    root.reactElement = reactElement;
    root.domContainerNode = domContainerNode;

    return vNode.getPublicInstance();
}

export default {
    _reRender: () => setTimeout(render, 0),
    render
};
