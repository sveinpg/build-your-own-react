# Table of contents

:closed_book: [Introduction](#introduction)

:runner: [Run the code](#run-the-code)

:construction_worker_man: [Tasks](#tasks)

# <a name="introduction"></a> :closed_book: Introduction

Generally, when we speak about React we talk about both [React](https://www.npmjs.com/package/react) and [ReactDOM](https://www.npmjs.com/package/react-dom). Prior to v0.14, all ReactDOM functionality was part of the React package. This may be a source of confusion, since older documentation won't mention the distinction between the React and ReactDOM packages.

**ReactDOM** is the glue between React and the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). When you want to show your React application you need to use `ReactDOM.render()` from the ReactDOM package. This package include the [reconciliation algorithm](#reconciliation) and platform-specific code – also known as [renderers](#renderers).

**React** – often referred to as React core and includes [the top-level React APIs](https://reactjs.org/docs/react-api.html#react). It only includes the APIs necessary to define components: the component base class, lifecycle methods, state, props and all the concepts we know and love.

## <a name="react-elements"></a> React elements

React elements are the building blocks of React applications. React elements might be confused with the concept of
React components. To clarify, React elements are generally what gets rendered on the screen, i.e. the return value of
the `render()` method of a React component or the return of a functional component.

```jsx
const element = <p>I'm an element</p>;
```

## <a name="renderers"></a> Renderers

React was originally created for the DOM, but the concept of renderers was introduced to support native platforms like React Native. A renderer is responsible for turning a tree of [React elements](#react-elements) into the underlying platform. In other words, if we want to support another platform all we need is a new renderer.

In this workshop we are going to create a renderer that renders React components to the DOM, just like ReactDOM.

## <a name="reconciliation"></a> Reconciliation

Different renderers such as ReactDOM and React Native shares a lot of logic. Rendering, custom components, state, lifecycle methods and refs should work consistently across platforms.

When you use React you can think of the `render()` method as creating a tree of React elements. If props or state is
changed, the `render()` method might return a different tree. The reconciler then needs to figure out how to
effectively update the UI to match the most recent tree with the minimum number of operations required.

> If you want to learn more about this, the [React documentation](https://reactjs.org/docs/reconciliation.html) contains an article that explains the choices made in React's diffing algorithm.

# <a name="run-the-code"></a> :running: Run the code

```
cd src
npm install
npm start
```

The dev server should now be running on http://localhost:1234

## Examples

Need to test your implementation?

We have provided you with some examples you can use in `src/examples`

# The structure

If you've already looked in the `/react-dom` directory or `/react` directory, you might have noticed that they
are not empty.
We've taken the liberty of implementing a skeleton for you of empty functions that are to be implemented.

To stay true to the virtual-DOM mindset you will find `VCompositeNode.js` and `VDomNode.js` in the `react-dom`
directory. `VDomNode.js` is a "virtual" DOM-node, while the `VCompositeNode` represents a "virtual" react-component node.
Everything that can be represented in the DOM, such as a `number`, `string`, `div`, `a`, `p` etc. should be a
`VDomNode`. Everything else, and by that we mean stateful- or stateless-components should be a `VCompositeNode`.

These "virtual"-nodes can have children, which again are "virtual" nodes. This means that we get a tree-structure
of nodes known as the "virtual DOM". The "virtual DOM" that we are about to implement is pretty naive. Nevertheless,
the structure is there to make it easier to extend with a more advanced reconciliation-algorithm that
can just render portions of a sub-tree instead of rendering the whole tree every time.

# <a name="tasks"></a> :construction_worker_man: Tasks

Time to get your hands dirty.

To make your life easier, we have used emojis to mark important content:

:trophy: - A task.

:bulb: - Tips and helpful information to solve a specific task.

:fire: - An extra task if you're up for it.

:books: - Some extended information you might check out some other time.

### :bulb: Yes, already a tips. Starting off strong!

We have implemented a test-suite, with unit-tests for each task. This way you can easily verify that you've implemented
the task correctly.

You can run the tests for task 1 with `npm run test1`, the tests for task 2 with `npm run test2`, and so on.

Note that these test scripts will also run the tests for all the previous tasks. This way you can be sure you don't break anything in the process.

## 1. React.createElement()

`createElement` creates and returns a new [React element](#react-elements) of a given type. The function signature of `createElement` takes three arguments:

-   `type` - the type of the element we are creating. This can be either be a [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or a React component. If we are creating a HTML element, the name of the element (`div`, `p` etc.) is passed as a string. If we are creating a React component, the variable that the component is assigned to is passed as the value.
-   `props` - An object containing the properties (`props`) that get passed to the component.
-   `children` - The children of the component. You can pass as many children as you want.

```js
React.createElement(type, props, ...children);
```

The function returns an object like the one below.

```js
{
  type: 'div',
  props: {
    children: [{
      type: 'button',
      props: { className: 'blue' }
    }, {
      type: 'button',
      props: { className: 'red' }
    }]
  },
  $$typeof: Symbol.for("react.element"),
  ref: null,
  _owner: null
}
```

:trophy: Implement the `createElement` function in the file named `react/index.js`

:bulb: Unfamiliar with `React.createElement()`? Code written with [JSX](https://reactjs.org/docs/introducing-jsx.html) will be converted to use React.createElement(). You will not typically invoke React.createElement() directly if you are using JSX.

:bulb: In this workshop, we won't make use of `$$typeof`, `ref` or `_owner`, but do take a look at [this blog post](https://overreacted.io/why-do-react-elements-have-typeof-property/) for details about what `$$typeof` is. Essentially it is to protect
against XSS-attacks.

## 2. Render HTML elements

Time to render our newly created React element!

React elements can be of different types (HTML elements, React components or primitive types like `number` and `string`), specified by the `type` value in our newly created object. Let's start with the HTML elements.

The specific HTML element we are going to render is specified by the `type` value of the React element with a `string`. HTML elements are the only type of React elements that are specified by a string.

To complete our task, we need to:

1. return a `new VDomNode(reactElement)` from the `instantiateVNode` function in `react-dom/index.js`.
2. In `render`, we just call `instantiateVNode` with our `reactElement`.
3. Append the result of `mount` from the node that `instantiateVNode` produces to the `container`.

Remember to also implement the `constructor` and `mount` in `VDomNode`:

4. The `constructor` need to set the `reactElement`-argument as a class-property.
5. `mount` has to create a DOM-element from the `reactElement` class-property and return it.

The following call to `ReactDOM.render()`...

```js
ReactDOM.render(
    React.createElement('div', {}),
    document.getElementById('root')
);
```

...should result in a `div` element within our root element.

```html
<div id="root">
    <div></div>
</div>
```

:trophy: Create a new HTML node and append it to the DOM. Write your code in `/react-dom`.

:bulb: [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) can be used to create HTML elements.

:bulb: [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) method adds a node to the end of the list of children of a specified parent node.

## 3. Handle children

Great, we are now able to create **one** HTML element! In order to render more than one element we need to handle children.

To do so we have to extend the `mount()` function in `VDomNode.js` to iterate over possible children:

1. Get `props.children` of the `reactElement` and map the children to `instantiateVNode`, which will create virtual
   DOM-nodes.
2. Iterate over the array of virtual child DOM-nodes and use `appendChild` to append them to the element you created
   in the previous task.

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

:trophy: Extend the `mount` function in `VDomNode.js` to support children.

:bulb: React elements can have multiple children.

## 4. Primitive types

Your next task is to handle primitive types like `number` and `string`.
Unlike HTML elements and React components, primitive types are not represented with a React element.
Moreover, they are not represented with an object with a `type` field. Instead they are represented with their own value.
Because of this primitive types are always children of another React element.

We need to extend the `mount` function in `VDomNode` to support primitive types:

1. Check the `typeof` the `reactElement`,
2. If it is a primitive (`number` or `string`), create a new DOM-node and return it.
3. If it's not a primitive, then do the logic we implemented in the previous tasks.

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

To check if an element is a primitive type, you should remember:

:bulb: Primitive types are not represented with an object with a `type` field.

:bulb: Primitives are always leaf-nodes and does have children.

:bulb: You can use the [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator to check the type of a variable, like this util-function:

```js
static isPrimitive(reactElement) {
    return !reactElement.type &&
        (typeof reactElement === 'string' || typeof reactElement === 'number');
}
```

:bulb: [createTextNode](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode) is perfect for
representing primitive types in the DOM.

## 5. Functional components and props

In many ways React components are like JavaScript functions.
Just like functions, they accept arbitrary input. All input values are passed to the component in a single object called `props`.
Props are used to customise components, and enables us to re-use components.

For example, this code renders "Hello, NDC" on the page.

```jsx
function Greeting(props) {
    return <p>Hello, {props.name}</p>;
}

const element = <Greeting name="NDC" />;
ReactDOM.render(element, document.getElementById('root'));
```

In the above example the prop "name" is set as a JSX attribute. React passes all JSX attributes to our user-defined component in a single object.

To get functional components working, you should:

1. Extend `instantiateVNode` in `react-dom/index.js` to be able to instantiate a `VCompositeNode`.
   To do this, just check if the `type` attribute of `reactElement` is a `function` (use `typeof`).

You also need to implement `VCompositeNode.js`:

2. The `constructor` need to set the `reactElement`-argument as a class-property.
3. `mount` should render the `reactElement` class-property by calling `type` as a function with its `props` as the
   argument (`type(props);`).
4. Call `instantiateVNode` with the result the rendering we did in step-3 to get a virtual-node.
5. The last ting we need to do is to call `mount` on the virtual-node we got in step-5 and return the value.

:trophy: Extend `react-dom/index.js` and `VCompositeNode.js` to handle functional components.

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

## 8. Attributes

If you are familiar with HTML, you know that we need to support more attributes than `style` and `className`. Luckily for us, most of these attributes are similar for React (we will handle events in the next task).

:trophy: Loop through the rest of the attributes (`props`) and add them to the DOM node.

:bulb: You can use [setAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) to set attributes.

:bulb: You can use [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) to loop through the keys and values of an object.

## 9. Events

With plain html and JavaScript we primarily have to two ways of adding event listeners. You can either use the [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) JavaScript method or you can pass a string as a HTML attribute to the HTML element.

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

[Handling events in React](https://reactjs.org/docs/handling-events.html) is similar to the second way of adding an event listener – by passing a HTML attribute. However, there are some syntactic differences:

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

## 10. React.Component

Now we have created a library that supports stateless applications, well done!

Stateless applications are only required to render once, and that is exactly what we have created – a React-like library that supports initial rendering. The next step to make this library complete is to introduce state.

Historically, stateful React components are defined using [a class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes).

> With the addition of hooks, you can [use state and other React features](https://reactjs.org/docs/hooks-state.html) without writing a class. This will not be covered in this workshop.

```jsx
class Greeting extends React.Component {
    render() {
        return <p>Hello, {this.props.name}</p>;
    }
}
```

To create a class component you simply extend [React.Component](https://reactjs.org/docs/react-component.html) and implement the `render`-method to specify what to render.

:trophy: Create a class in `react.js` and export it with the name `Component`.

:bulb: Use a [named export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#Description) to specify the name of an export.

As mentioned, the `render`-method is used to specify what to render. It is the only required method in a class component and should return [React elements](#react-elements).

:trophy: Create an instance method in your newly created class called `render` that throws an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

:bulb: By creating this method we enforce that all classes that extend our class implement a `render`-method.

## 11. Render class components

Passing class components to our implementation of React DOM does not work properly – yet.

**Firstly**, they are not rendered at all. We need to treat functional and class components differently. In contrast to functional components, we need to call the `render`-method to determine the React elements to render. To do this we need to know if a component is a functional or class component. Since [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) in fact are functions, we can not use the type of the variable to determine it. Instead we simply add a [prototype data value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) to our `React.Component`.

```js
Component.prototype.isReactComponent = {};
```

> In JavaScript, [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) are first-class objects, because they can have properties and methods just like any other object. Because of this we can use `Object.prototype` to store data values.

:trophy: Add the `isReactComponent` prototype data value to our class, and use this to determine if we should call the function itself or the `render`-method of a component in React DOM.

**Secondly**, our class component does not support `props` yet. Props should be accessible in all the class methods of our class. In other words, the props should be available in the [function context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context) of our class.

:trophy: Implement a [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor) that takes the `props` as an argument and assign them to the class.

:bulb: To assign the `props` you can simply say: `this.props = props;`

## 12. State

As mentioned, the whole point of making this Component class is to be able to create stateful components.
So finally, let's add some state.

Setting the initial state of your component is really easy. Just assign an object with some properties to the property `state` on your class.
Just like with props, this is now accessible through `this.state`.

```jsx
class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: 'world' };
    }

    render() {
        return <p>Hello, {this.state.name}</p>;
    }
}
```

Strictly speaking your component now just has a property `state`, it doesn't really _have_ state.
As you may know, in React you can use `this.setState()` to change this property, and finally make your component stateful.

:trophy: Implement an instance method on your `React.Component` class which takes `state` as an argument.
This is expected to be an object, and it should be merged to the existing state.
If it is `undefined` or `null` you should simply do nothing - just return from the function.

:bulb: To merge objects you can either use `Object.assign()` or the shorthand [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

:fire: In React `setState()` can also take a function as the first parameter. If you want this you can check the type of `state` in your function. If it's a function, call it with the current state as an argument.

If you try this code now, you might notice that changing the state doesn't actually change anything in your DOM.
Your `setState()` method also needs to trigger a re-render of your DOM.

:trophy: In your `setState()` method call `ReactDOM.render()` after updating the state.

Note that if you have many components updating their state at the same time, this might be quite the bottleneck.
It will be very advantageous to defer the actual rendering until after we are done updating state in all components.
We can do this by wrapping `ReactDOM.render()` in a `setTimeout`.

:trophy: Implement a re-render function in ReactDOM and call this from `setState()` instead.
This function should call `setTimeout` with `ReactDOM.render()` as its callback function.

:bulb: Timeouts in JS are only guaranteed to not run _sooner_ than requested, but they _may_ run later.
A timeout of 0 ms will run its callback as soon as the browser isn't busy doing other things - like updating lots of component states.

:books: When you use `setTimeout` the callback function is placed on the callback queue and ran at the next event loop.
There was [a nice talk about this](https://www.youtube.com/watch?v=8aGhZQkoFbQ) at JSConf EU 2014.

# Next steps

That’s all – we have a functional version of React now. Lets take a closer look at what we built:

-   Supports HTML elements, such as `<div />` and `<p />`
-   Supports both functional and class components.
-   Handles children, state, props, events and other attributes.
-   Supports initial rendering and re-rendering.

The main purpose of this article was to demonstrate core principles of React internal structure. However, some features were left out and this implementation serves as a foundation for you extend with these features.

## Remove the class cache

In our implementation we used a class cache to keep track of instanciated classes. However, this approach is flawed. If the order of components changes between renders we will retrieve the wrong class instance from the cache.

Every time we change the state of one our components in our application, the DOM gets uppdated to reflect the new state. Frequent DOM manipulations affects performance and should be avoided. To avoid this we should minimize the number of manipulations.

> If an element type in the same place in the tree “matches up” between the previous and the next renders, React reuses the existing host instance.
> Source: https://overreacted.io/react-as-a-ui-runtime/#reconciliation

There are multiple ways to reduce the number of manipulations. For instance, by reusing HTML-elements (such as `<div/>`) or to use the `key` prop of children to determine which to update.

In `src/solution/react-dom/react-dom` we have provided a more advanced implementation that you can use as inspiration.

## Lifecycle methods

React components has several "lifecycle methods" that you can override to run code at a particular time. For instance, to run code after the component is mounted we can override `Component.componentDidMount`.

Read the about the lifecycle methods in [the documentation](https://reactjs.org/docs/react-component.html#the-component-lifecycle) and try to implement them yourself.

## Reconciliation

Our implementation renders the whole application regardless of which part of the application that triggered the re-render. To further improve the performance of our implementation we can add a `_dirty` to the component that changed. This way we are able to only re-render the subtree that changed.
