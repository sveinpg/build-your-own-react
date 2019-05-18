# Table of contents

:closed_book: [Introduction](#introduction)

:runner: [Run the code](#run-the-code)

:construction_worker_man: [Tasks](#tasks)

# <a name="introduction"></a> :closed_book: Introduction

Generally, when we speak about React we talk about both [React](https://www.npmjs.com/package/react) and [ReactDOM](https://www.npmjs.com/package/react-dom). Prior to v0.14, all ReactDOM functionality was part of the React package. This may be a source of confusion, since older documentation won't mention the distinction between the React and ReactDOM packages.

**ReactDOM** is the glue between React and the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). When you want to show your React application you need to use `ReactDOM.render()` from the ReactDOM package. This package include the [reconciliation algorithm](#reconciliation) and platform-specific code – also known as [renderers](#renderers).

**React** – often refered to as React core – only includes [the top-level React APIs](https://reactjs.org/docs/react-api.html#react). It only includes the APIs necessary to define components: the component base class, lifecycle methods, state, props and all the concepts we know and love.

## <a name="react-elements"></a> React elements

React elements are the building blocks of React applications. React elements might be confused with the concept of React components. To clarify, React elements are what you see on the screen – the return value of the `render()` method of a React component.

```jsx
const element = <p>I'm an element</p>;
```

## <a name="renderers"></a> Renderers

React was originally created for the DOM, but the concept of renderers was introduced to support native platforms like React Native. A renderer is responsible for turning a tree of [React elements](#react-elements) into the underlying platform. In other words, if we want to support another platform all we need is a new renderer.

In this workshop we are going to create a renderer that renders React components to the DOM – just like ReactDOM.

## <a name="reconciliation"></a> Reconciliation

Different renderes such as ReactDOM and React Native shares a lot of logic. Rendering, custom components, state, lifecycle methods and refs should work consistently across platforms.

When you use React you can think of the `render()` method as creating a tree of React elements. If props or state is changed, the `render()` method will return a different tree. The reconciler then needs to figure out how to effectively update the UI to match the most recent tree with the minimum number of operations required.

> If you want to learn more about this, the [React documentation](https://reactjs.org/docs/reconciliation.html) contains an article that explains the choices made in React's diffing algorithm.

# <a name="run-the-code"></a> :running: Run the code

```
cd src
npm install
npm start
```

The dev server should now be running on http://localhost:1234

# <a name="tasks"></a> :construction_worker_man: Tasks

Time to get your hands dirty.

To make your life easier, we have used emojis to mark important content:

:trophy: - A task.

:bulb: - Tips and helpful information to solve a specific task.

## 1. React.createElement()

`createElement` creates and returns a new [React element](#react-elements) of a given type. The function signature of `createElement` takes three arguments:

- `type` - the type of the element we are creating. This can be either be a [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or a React component. If we are creating a HTML element, the name of the element (`div`, `p` etc.) is passed as a string. If we are creating a React component, the variable that the component is assigned to is passed as the value.
- `props` - An object containing the properties (`props`) that get passed to the component.
- `children` - The children of the component. You can pass as many children as you want.

```js
React.createElement(type, props, ...children);
```

The function returns an object like the one below.

TODO: Update this code snippet

```js
{
  $$typeof: Symbol.for("react.element"),
  type: "div",
  props: {
      children: []
  },
  ref: null,
  _owner: null
}
```

:trophy: Implement `createElement` in the file named `react.js`

:bulb: Unfamiliar with `React.createElement()`? Code written with [JSX](https://reactjs.org/docs/introducing-jsx.html) will be converted to use React.createElement(). You will not typically invoke React.createElement() directly if you are using JSX.

## 2. Render HTML elements

Time to render our newly created React element!

React elements can be of different types (HTML elements, React components or primitive types like `number` and `string`), specified by the `type` value in our newly created object. Let's start with the HTML elements.

The specific HTML element we are going to render is specified by the `type` value of the React element with a `string`. HTML elements are the only type of React elements that are specified by a string.

```js
// ReactDOM.js

const render = (element, targetElement) => {
  if (typeof element.type === "string") {
    // Your code goes here
  }
};
```

The following call to `ReactDOM.render()`..

```js
ReactDOM.render(
  React.createElement("div", {}),
  document.getElementById("root")
);
```

..should result in a `div` element within our root element.

```html
<div id="root">
  <div></div>
</div>
```

:trophy: Create a new HTML node and append it to the DOM. Write your code in `ReactDOM.js`.

:bulb: [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) can be used to create HTML elements.

:bulb: [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) method adds a node to the end of the list of children of a specified parent node.

## 3. Handle children

Great, we are now able to create **one** HTML element! In order to render more than one element we need to handle children.

The following call to `ReactDOM.render()`..

```js
ReactDOM.render(
  React.createElement("div", {}, React.createElement("div", {})),
  document.getElementById("root")
);
```

..should result in two nested `div` elements within our root element.

```html
<div id="root">
  <div>
    <div></div>
  </div>
</div>
```

To handle children we are going to recursively call the `render()` method in `ReactDOM.js` until we discover an element without children.

:trophy: Extend the `render` method to support children.

:bulb: React elements can have multiple children.

## 4. Primitive types

Your next task is to handle primitive types like `number` and `string`. Unlike HTML elements and React components, primitive types are not represented with a React element. Moreover, they are not represented with an object with a `type` field. Instead they are represented with their own value. Because of this primitive types are always children of another React element.

The following call to `ReactDOM.render()`..

```js
ReactDOM.render(
  React.createElement("div", {}, "Hello world!"),
  document.getElementById("root")
);
```

..should result in a `div` element with the text `Hello world!` inside it.

```html
<div id="root">
  <div>
    <div></div>
  </div>
</div>
```

:trophy: Extend the `render()` method in `ReactDOM.js` to support primitive types by appending their value to the target element.

To check if an element is a primitive type, you should rememeber:

:bulb: Primitive types are not represented with an object with a `type` field.

:bulb: You can use the [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator to check the type of a variable.

## 5 Props

## 6. Classes

## 7. Inline styles

## 8. Events

## 9. React components

## 10. State

## 11. Conditional rendering
