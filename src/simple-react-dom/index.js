import VCompositeNode from './VCompositeNode';
import VDomNode from './VDomNode';

const root = {};

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
    const vNode = instantiateVNode(reactElement);

    const domNode = vNode.mount();
    domNode._vNode = vNode;

    if (root.domContainerNode) {
        domContainerNode.innerHTML = '';
    }

    domContainerNode.appendChild(domNode);

    root.reactElement = reactElement;
    root.domContainerNode = domContainerNode;

    return vNode.getPublicInstance();
}

export default {
    _reRender: () => setTimeout(render, 0),
    render
};
