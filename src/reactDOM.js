const render = (element, targetElement) => {
  if (!element) {
    // Not valid
    return null;
  }

  if (!element.type) {
    if (typeof element === "string") {
      // Append text node
      targetElement.appendChild(document.createTextNode(element));
    }
  }

  if (typeof element.type === "function") {
    // Recursivly render components
    if (
      element.type.prototype &&
      typeof element.type.prototype.render === "function"
    ) {
      // Class component
      const component = new element.type(element.props);
      render(component.render(), targetElement);
    } else {
      // Function component
      render(element.type(element.props), targetElement);
    }
  }

  if (typeof element.type === "string") {
    // Render html-tags
    const node = document.createElement(element.type);
    const component = targetElement.appendChild(node);

    // Set className
    if (element.props.className) {
      node.className = element.props.className;
    }

    // Render children
    if (Array.isArray(element.props.children)) {
      element.props.children.forEach(child => {
        render(child, component);
      });
    } else if (element.props.children) {
      render(element.props.children, component);
    }
  }
};

module.exports = {
  render: render
};
