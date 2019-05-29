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

-   `type` - the type of the element we are creating. This can be either be a [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or a React component. If we are creating a HTML element, the name of the element (`div`, `p` etc.) is passed as a string. If we are creating a React component, the variable that the component is assigned to is passed as the value.
-   `props` - An object containing the properties (`props`) that get passed to the component.
-   `children` - The children of the component. You can pass as many children as you want.

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
    if (typeof element.type === 'string') {
        // Your code goes here
    }
};
```

The following call to `ReactDOM.render()`..

```js
ReactDOM.render(
    React.createElement('div', {}),
    document.getElementById('root')
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
    React.createElement('div', {}, React.createElement('div', {})),
    document.getElementById('root')
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
    React.createElement('div', {}, 'Hello world!'),
    document.getElementById('root')
);
```

..should result in a `div` element with the text `Hello world!` inside it.

```html
<div id="root">
    <div>
        Hello world!
    </div>
</div>
```

:trophy: Extend the `render()` method in `ReactDOM.js` to support primitive types by appending their value to the target element.

To check if an element is a primitive type, you should rememeber:

:bulb: Primitive types are not represented with an object with a `type` field.

:bulb: You can use the [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator to check the type of a variable.

## 5. Functional components and props

In many ways React components are like JavaScript functions. Just like functions, they accept arbitrary input. All input values are passed to the component in a single object called `props`. Props are used to customize components, and enables us to re-use components.

For example, this code renders "Hello, NDC" on the page.

```jsx
function Greeting(props) {
    return <p>Hello, {props.name}</p>;
}

const element = <Greeting name="NDC" />;
ReactDOM.render(element, document.getElementById('root'));
```

In the above example the prop "name" is set as a JSX attribute. React passes all JSX attributes to our user-defined component in a single object.

:trophy: Extend `reactDOM.js` to handle functional components.

:trophy: Extend your handling of functional components to pass `props` to the function.

:bulb: As you see in the code snippet above, you can simply give the `props` object as an argument to your functional component.

## 6. className

No application is complete without styling. In React there is mainly two ways to style your elements – [inline styling](https://reactjs.org/docs/dom-elements.html#style) and [CSS](https://reactjs.org/docs/faq-styling.html). We'll cover CSS in this task and inline styling in task #7.

To specify a CSS class of an element, use the `className` attribute. This is one of the JSX attributes (`props`) that are reserved by React. It is used to set the [class attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) of the specific element.

:trophy: Implement support for the `className` attribute in `VDomNode.js`

:bulb: You can use the [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) property of the Element interface to set the value of the class attribute of a specific HTML element.

## 7. Inline styles

Inline styling is another way to style your application. The `style` attribute accepts a JavaScript object with camelCased properties. For instance, `background-color` becomes `backgroundColor` etc.

> This is different from HTML where the [style attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style) accepts a CSS-string.

:trophy: Implement support for the `style` attribute in `VDomNode.js`

:bulb: You can use the [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property of the HTMLElement to set the style attribute of a specific HTML element.

TODO: Skal vi ha en oppgave som looper over resten av attributtene?

## 8. Attributes

If you are familiar with HTML, you know that we need to support more attributes than `style` and `className`. Luckily for us, most of these attributes are simular for React (we will handle events in the next task).

:trophy: Loop through the rest of the attributes (`props`) and add them to the DOM node.

:bulb: You can use [setAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) to set attributes.

:bulb: You can use [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) to loop through the keys and values of an object.

## 9. Events

With plain html and JavaScript we primarly have to two ways of adding event listeners. You can either use the [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) JavaScript method or you can pass a string as a HTML attribute to the HTML element.

```html
<button id="click-me">JavaScript</button>
<button onclick="alert('The second button was clicked')">HTML-attribute</button>

<script type="text/javascript">
    var element = document.getElementById('click-me');
    element.addEventListener('click', function() {
        alert('The first button was clicked');
    });
</script>
```

[Handling events in React](https://reactjs.org/docs/handling-events.html) is simular to the second way of adding an event listener – by passing a HTML attribute. However, there are some syntactic differences:

-   React events are named using camelCase, rather than lowercase.
-   With JSX you pass a function as the event handler, rather than a string.

```jsx
const button = () => (
    <button onClick={() => alert('The button was clicked')}>Click me</button>
);
```

> When using React you should generally not need to call `addEventListener` to add listeners to a DOM element after it is created.

:trophy: Use `addEventListener()` to add event listeners for each of the attributes that start with `on`.

:bulb: You can use the following regex to find strings that start with `on`:

```js
const varToTest = 'onClick';

if (/^on.*$/.test(varToTest)) {
    console.log('Found match ', varToTest);
}
```

## 10. React components

## 11. State

## 12. Conditional rendering
