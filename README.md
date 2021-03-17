# Build your own React

## Table of contents

:closed_book: [Introduction](#introduction)

:runner: [Test your implementation](#test-your-impl)

:construction_worker_man: [Tasks](#tasks)

## <a name="introduction"></a> :closed_book: Introduction

Generally, when we speak about React we talk about both [React](https://www.npmjs.com/package/react) and [ReactDOM](https://www.npmjs.com/package/react-dom).
Prior to v0.14, all ReactDOM functionality was part of the React package.
This may be a source of confusion, since older documentation won't mention the distinction between the React and ReactDOM packages.

**ReactDOM** is the glue between React and the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).
When you want to show your React application you need to use `ReactDOM.render()` from the ReactDOM package.
This package include the [reconciliation algorithm](#reconciliation) and platform-specific code – also known as [renderers](#renderers).

**React** – often referred to as React core and includes [the top-level React APIs](https://reactjs.org/docs/react-api.html#react).
It only includes the APIs necessary to define components: the component base class, 
lifecycle functions, state, props and all the concepts we know and love.

### <a name="react-elements"></a> React elements

React elements are the building blocks of React applications. React elements might be confused with the concept of
React components. To clarify, React elements are generally what gets rendered on the screen, i.e. the return value of
the `render()` function of a React component or the return of a functional component.

```jsx
const element = <p>I'm an element</p>;
```

### <a name="renderers"></a> Renderers

React was originally created for the DOM, but the concept of renderers was introduced to support native platforms like React Native.
A renderer is responsible for turning a tree of [React elements](#react-elements) into the underlying platform. In other words,
if we want to support another platform all we need is a new renderer.

In this workshop we are going to create a renderer that renders React components to the DOM, just like ReactDOM.

### <a name="reconciliation"></a> Reconciliation

Different renderers, such as ReactDOM and React Native, share a lot of logic. Rendering, custom components, state, 
lifecycle functions and refs should work consistently across platforms.

When you use React you can think of the `render()` function as creating a tree of React elements. If props or state is
changed, the `render()` function might return a different tree. The reconciler then needs to figure out how to
effectively update the UI to match the most recent tree with the minimum number of operations required.

> If you want to learn more about this, the [React documentation](https://reactjs.org/docs/reconciliation.html) contains an article that explains the choices made in React's diffing algorithm.

## <a name="test-your-impl"></a> :running: Testing your implementation

First of all, run `npm install`

We have provided you with tests for each task. We urge you to use these and run them after each task to verify your implementation or to point you in the right direction.

To run the tests for a specific task, you can simply specify the task (in this case task 1):

```
npm run test1
```

To run tests for task 2, just replace `test1` with `test2`, and so on.

To run all tests:

```
npm run test
```

Note that these test scripts will also run the tests for all the previous tasks. This way you can be sure you don't break anything in the process.

### Playground

In addition to the tests, you can edit `src/index.js` to play with your implementation.

To run the code:

```
npm start
```

The dev server should now be running on http://localhost:1234

### Examples

We have provided you with  e examples you can use in `src/examples`

To run an example:

1. Change directory to the example `cd src/examples/<the example you want to test>`
2. Install and run the example with `npm`

For instance, if you want to test the todo-example

```
cd src/examples/todo
npm install
npm start
```

## :house: The structure

If you've already looked in the `/react-dom` directory or `/react` directory, you might have noticed that they
are not empty.
We've taken the liberty of implementing a skeleton of empty functions for you to implement.

To stay true to the virtual-DOM mindset you will find `VCompositeNode.js` and `VDomNode.js` in the `react-dom`
directory. `VDomNode.js` is a "virtual" DOM-node, while the `VCompositeNode` represents a "virtual" react-component node.
Everything that can be represented in the DOM, such as a `number`, `string`, `div`, `a`, `p` etc. should be a
`VDomNode`. Everything else, and by that we mean stateful- or stateless-components should be a `VCompositeNode`.

These "virtual" nodes can have children, which again are "virtual" nodes. This means that we get a tree-structure
of nodes known as the "virtual DOM". The "virtual DOM" that we are about to implement is pretty naive. Nevertheless,
the structure is there to make it easier to extend with a more advanced reconciliation algorithm that
can just render portions of a sub-tree instead of rendering the whole tree every time.

## <a name="tasks"></a> :construction_worker_man: Tasks

Time to get your hands dirty.

To make your life easier, we have used emojis to mark important content:

:trophy: - A task.

:bulb: - Tips and helpful information to solve a specific task.

:fire: - An extra task if you're up for it.

:books: - Some extended information you might check out some other time.

:running: - We'll keep on reminding you to run the tests.

### 1. React.createElement()

`createElement` creates and returns a new [React element](#react-elements) of a given type. The function signature of `createElement` takes three arguments:

-   `type` - the type of the element we are creating. This can be either be an [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or a React component. If we are creating an HTML element, the name of the element (`div`, `p` etc.) is passed as a string. If we are creating a React component, the variable that the component is assigned to is passed as the value.
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
    className: 'my-class',
    randomProp: 'randomValue',
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

:bulb: We use the rest operator `...children` to handle several children. However, if the app code specifies children as an array, the rest operator will still wrap the argument in an array.
When this is the case you need to [flatten](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) the array (requires polyfill for IE/Edge).

:books: In this workshop, we won't make use of `$$typeof`, `ref` or `_owner`, but do take a look at [this blog post](https://overreacted.io/why-do-react-elements-have-typeof-property/) for details about what `$$typeof` is. Essentially it is to protect
against XSS-attacks.

:running: It's time to run some tests. If you haven't already, run `npm install` first. Then run `npm run test1`.

### 2. Render HTML elements

Time to render our newly created React element!

React elements can be of different types (HTML elements, React components or primitive types like `number` and `string`), specified by the `type` value in our newly created object. Let's start with the HTML elements.

The specific HTML element we are going to render is specified by the `type` value of the React element with a `string`. HTML elements are the only type of React elements that are specified by a string.

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

To complete our task, we need to:

1. return a `new VDomNode(reactElement)` from the `instantiateVNode` function in `react-dom/index.js`.

2. In `render`, we instantiate our virtual node with our reactElement by calling `instantiateVNode(reactElement)`. Store it in a variable named `vNode`.

Now we need to mount (create a DOM-element) for our virtual node and append it to the DOM.

3. In `render` we need to mount our virtual node by calling the mount method on the virtual node. `vNode.mount()`

4. Append the result of the mount method to the `domContainerNode`.

:bulb: [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) function adds a node to 
the end of the list of children of a specified parent node.

Remember to also implement the `constructor` and `mount` in `VDomNode`:

5. The `constructor` need to set the `reactElement`-argument as a class-property. For instance [like this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#class_declarations)

6. `mount` has to create a DOM-element from the `reactElement` class-property and return it.

:bulb: [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) can be used to create HTML elements.

:running: Remember to run the tests `npm run test2` :wave:

### 3. Handle children

Great, we are now able to create **one** HTML element! In order to render more than one element we need to handle children.

To do so we have to extend the `mount()` function in `VDomNode.js` to iterate over possible children:

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

1. Get `props.children` of the `reactElement` and map the children to `instantiateVNode`, which will create virtual
   DOM-nodes.

:bulb: You can use this util method to get the children as an array from the props

```js
function getChildrenAsArray(props) {
    const { children = [] } = props || {};
    return Array.isArray(children) ? children : [children];
}
```

2. Iterate over the array of virtual child nodes, mount each of the virtual child nodes with the `.mount()` and use `appendChild` to append the result of `mount` to the element you created
   in the previous task.

:running: Third time's the charm, run those tests! `npm run test3`

### 4. Primitive types and empty elements

Your next task is to handle primitive types like `number` and `string`, as well as empty elements.
Unlike HTML elements and React components, primitive types and empty elements are not represented as a standard React element.
Moreover, they are not represented as an object with a `type` field. Instead, they are represented as their own value.
Because of this primitive types and empty elements are always leaf nodes (i.e. children of another React element).

The following call to `ReactDOM.render()`...

```js
ReactDOM.render(
    React.createElement('div', {}, 'Hello world!'),
    document.getElementById('root')
);
```

...should result in a `div` element with the text `Hello world!` inside it.

```html
<div id="root">
    <div>
        Hello world!
    </div>
</div>
```

...while...

```js
ReactDOM.render(
    React.createElement('div', {}, null),
    document.getElementById('root')
);
```

...should result in just a `div`.

```html
<div id="root">
    <div></div>
</div>
```

:trophy: Extend the `mount` function in `VDomNode` to support primitive types and empty elements.

1. Check if the `reactElement` is a empty (`null` or `undefined`)

:bulb: Primitive types and empty elements are not represented with an object with a `type` field.

2. If the element is in fact empty, return an empty DOM-node.

:bulb: [createTextNode](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode) is perfect for
representing primitive types and empty nodes in the DOM. Use `createTextNode` with an empty string as an argument. Since
this won't render anything to the DOM.

3. Check if the `reactElement` is a primitive type

:bulb: You can use the [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator to check the type of a variable, like this util-function:

```js
function isPrimitive(reactElement) {
    return !reactElement.type &&
        (typeof reactElement === 'string' || typeof reactElement === 'number');
}
```

4. If it is a primitive (`number` or `string`), create a new DOM-node and return it.

:bulb: Primitives are always leaf-nodes and does not have children.

5. If it's not a primitive, then do the logic we implemented in the previous tasks.

:running: You know what to do: `npm run test4`

### 5. Functional components and props

In many ways React components are like JavaScript functions.
Just like functions, they accept arbitrary input. All input values are passed to the component in a single object called `props`.
Props are used to customise components, and they enable component re-use.

For example, this code renders "Hello, NDC" on the page.

```jsx
function Greeting(props) {
    return <p>Hello, {props.name}</p>;
}

const element = <Greeting name="NDC" />;
ReactDOM.render(element, document.getElementById('root'));
```

In the above example, the prop "name" is set as a JSX attribute. React passes all JSX attributes to our user-defined component in a single object.

:trophy: Extend `react-dom/index.js` and `VCompositeNode.js` to handle functional components.

To get functional components working, you should:

1. Extend `instantiateVNode` in `react-dom/index.js` to be able to instantiate a `VCompositeNode`.
   To do this, just check if the `type` attribute of `reactElement` is a `function` (use `typeof`).

You also need to implement `VCompositeNode.js`:

2. The `constructor` needs to set the `reactElement` argument as a class property, just like we did for `VDomNode` in task 2.

3. The next thing we need to do is to render our component in `mount`. Call the functional component (`type`) with its `props` as the argument `type(props)`. 

:bulb: `this.reactElement.type` is a functional component (like `Greeting` in the snippet above).

4. Call `instantiateVNode` with the result of the rendering we did in step 3 to get a virtual node.

:bulb: User defined (composite) components always render *exactly one* React element (which in turn can contain multiple React elements as children), hence we only need to call `instantiateVNode` once with the value returned from our component. 

5. The last thing we need to do is to call `mount` on the virtual node from step 4 and return the value.

:running: Don't forget the tests! `npm run test5`

### 6. className

No application is complete without styling. In React, there are two main ways to style your elements – [inline styling](https://reactjs.org/docs/dom-elements.html#style) and [CSS](https://reactjs.org/docs/faq-styling.html). We'll cover CSS in this task and inline styling in task #7.

To specify a CSS class of an element, use the `className` attribute. This is one of the JSX attributes (`props`) that are reserved by React. It is used to set the [class attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) of the specific element.

:trophy: Implement support for the `className` attribute in `VDomNode.js`

:bulb: You can use the [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) property of the Element interface to set the value of the class attribute of a specific HTML element.

:running: Tests FTW! `npm run test6`

### 7. Inline styles

Inline styling is another way to style your application. The `style` attribute accepts a JavaScript object with camelCased properties. For instance, `background-color` becomes `backgroundColor` etc.

> This is different from HTML where the [style attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style) accepts a CSS-string.

:trophy: Implement support for the `style` attribute in `VDomNode.js`

:bulb: You can use the [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property of the HTMLElement to set the style attribute of a specific HTML element.

:running: You know the drill. `npm run test7`

### 8. Attributes

If you are familiar with HTML, you know that we need to support more attributes than `style` and `className`. Luckily for us, most of these attributes are similar for React (we will handle events in the next task).

:trophy: Loop through the rest of the attributes (`props`) and add them to the DOM node.

:bulb: You can use [setAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) to set attributes.

:bulb: You can use [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) to loop through the keys and values of an object.

:running: You know the hammer too? Just kidding. That was a tool joke. What a tool. `npm run test8`

### 9. Events

With plain html and JavaScript we primarily have two ways of adding event listeners.
You can either use the [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
function or you can add an event as a string attribute to the HTML element.

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

Similarly, [events in React](https://reactjs.org/docs/handling-events.html) use attributes in JSX (props).
However, there are some syntactic differences:

-   React events are named using camelCase, rather than lowercase.
-   With JSX you pass a function as the event handler, rather than a string.

```jsx
const Button = () => (
    <button onClick={() => alert('The button was clicked')}>Click me</button>
);
```

> When using React you should generally not need to call `addEventListener` to add listeners to a DOM element after it is created.

:trophy: Use `addEventListener()` to add event listeners in `VDomNode.js` for each of the attributes that start with 
`on`.

:bulb: You can use the following regex to find strings that start with `on`:

```js
const varToTest = 'onClick';

if (/^on.*$/.test(varToTest)) {
    console.log('Found match ', varToTest);
}
```

:bulb: Remember that, unlike React, events in plain JavaScript do not use camelCasing.

:books: Alright, you got us! You called our bluff, the way we are implementing events in this task is not true to 
Facebook's implementation of React.
We had to cut some corners so you wouldn't be stuck here the rest of the week. React uses something called 
[SyntheticEvents](https://reactjs.org/docs/events.html). One of the benefits of SyntheticEvent is to make React code 
portable, meaning that the events are not platform (React native) or browser specific. The way React does this is, in 
short, to append only one listener for each event on the root of the app and then delegate these further down to 
underlying components with a wrapper of data from the original event.

:running: In the event you have forgotten to run your tests `npm run test9`.

### 10. React class components

Now we have created a library that supports stateless applications, well done!

Stateless applications always return the same result for every render. The next step to make this library complete is 
to introduce state.

Historically, stateful React components are defined using [a class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes).

> With the addition of hooks, you can [use state and other React features](https://reactjs.org/docs/hooks-state.html) without writing a class. This will not be covered in this workshop.

To create a class component you simply extend [React.Component](https://reactjs.org/docs/react-component.html) and 
implement the `render` function to specify what to render.

```jsx
class Greeting extends React.Component {
    render() {
        return <p>Hello, {this.props.name}</p>;
    }
}
```

If you take a look in `react/` you will find that we've already created a base `Component` for you.
But, using class components in our implementation of React still does not work properly – yet.

:trophy: As mentioned, the `render` function is used to specify what to render. It is the only required method in a 
class component and should return [React elements](#react-elements).
To enforce that all classes that extend the `Component` class implements the `render`, let the 
`render` function in `react/Component.js` throw an [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

:trophy: We need to treat functional and class components differently. In contrast to functional components, we need 
to call the `render` method to determine the React elements to render. 
To do this we need to know if a component is a functional or class component.
Since [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) in fact are functions,
we can not use the type of the variable to determine it. Instead add a simple flag as a
[prototype data value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
to our `react/Component.js`.

```js
Component.prototype.isReactComponent = true;
```

:trophy: Our class component does not support `props` yet. Props should be accessible in all the class methods of our
class. In other words, the props should be available in the
[function context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context)
of our class. Implement a [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Constructor)
that takes the `props` as an argument and assign them as a class property.

:bulb: To assign the `props` you can simply say: `this.props = props;`

:running: This seems like a good time to `npm run test10`.

### 11. Render React class component

So, we now have functioning React components that support `props`. But there is one problem... they don't render.

:trophy: We need to extend `mount` in `VCompositeNode` to not only handle functional components, but also 
class components.

1. To do this we have to check which component we are about to render. Remember the `isReactComponent` flag that
we introduced in the last task? It's almost scary how simple this is, but just check if `isReactComponent` is `true` 
on the `prototype` of the component (that is the `type` property of the `reactElement`).

2. Instead of calling `type` as a function, in the way that we did for functional components. We call `new type` with 
`props` as an argument.

3. We then need to call the `render` function of our newly instantiated component.

4. The result of `render` returns a `reactElement`. To make this a virtual node we call `instantiateVNode`.

5. To sum it all up, call `mount` on the virtual node we got in step 4.

:running: Hammer time, `npm run test11`.

### 12. State

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

Strictly speaking, your component now just has a property called `state`, it doesn't really _have_ state.
As you may know, in React you can use `this.setState()` to change this property, and finally make your component stateful.

:trophy: Implement `setState` in `react/Component.js`.
The argument of `setState` is expected to be an object, and it should be merged to the existing state.
If it is `undefined` or `null` you should simply do nothing - just return from the function.

:bulb: To merge objects you can either use `Object.assign()` or the shorthand [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

:fire: In React, `setState()` can also take a function as the first parameter. If you want this functionality, you can check the type of `state` in your function. If `state` is a function, call `state` with the current state as an argument.

:running: Time to check the state of things with `npm run test12`.

### 13. (Re)rendering with state

If you try the code you currently have, you might notice that changing the state doesn't actually change anything in your DOM.
Your `setState` function also needs to trigger a re-render of your DOM.

You could simply call `ReactDOM.render()` in `setState` after updating the state, but we want to do better than that.

If you have many components updating their state at the same time, simply calling `ReactDOM.render()` would be quite the bottleneck,
as you would be rendering for every single component updating its state.
It would be very advantageous to defer the actual rendering until after we are done updating state in all components.
We can do this by wrapping `ReactDOM.render()` in a `setTimeout` with a zero millisecond delay.

:trophy: Implement the `_reRender` function in ReactDOM and call this from the `setState` function.
The re-render function should call `setTimeout` with `ReactDOM.render` as its callback function.

:bulb: Timeouts in JS are only guaranteed to not run _sooner_ than requested, but they _may_ run later.
A timeout of 0 ms will run its callback as soon as the browser isn't busy doing other things - like updating lots of component states.

:books: When you use `setTimeout` the callback function is placed on the callback queue and ran at the next event loop.
There was [a nice talk about this](https://www.youtube.com/watch?v=8aGhZQkoFbQ) at JSConf EU 2014.

:trophy: Our implementation fails when we call `_reRender`. This is because we are calling the `render` function 
without any arguments in `_reRender`, while `render` expects a `reactElement` and a `domContainerNode`.
To fix this we have to store `reactElement` and `domContainerNode` from the first render and then, if `render` is 
called without any arguments (i.e. `reactElement` and `domContainerNode` are `undefined`), we use the stored instances.

:trophy: Even though we are calling to re-render in `setState` the state of components does not persist between renders.
The reason for this is that we are creating new components on every render instead of keeping previously rendered 
class components in memory.
To fix this, we are going to implement a class cache that saves our component instances between renders...

1. Add the `classCache` to `react-dom/index.js`:

```js
const classCache = {
    index: -1,
    cache: []
};
```

2. Call `mount` on the virtual node returned by `instantiateVNode` in the `render` method of `react-dom/index.js`, with the cache as the `mount` method's
argument. Don't call `mount` on the virtual nodes returned in `instantiateVNode`'s function declaration!

3. For `mount` in `VDomNode`, you need to pass the cache to the next call of `mount`.

4. For the `mount` function in `VCompositeNode`, if the component is a class component, we have to increase the 
cache's index property, and get the element at that new index of the `cache` array inside the `classCache` parameter. If the element is defined, use it and update its `props` attribute.
If the element is undefined, instantiate the class component as we did before. Remember to push the class instance back into the
cache after updating its `props` attribute.

5. On re-render, you need to reset the cache index and remove all contents in `domContainerNode` in `react-dom/index.js`.

:running: Finally, for the last time, run the tests `npm run test13`.

## :feet: Next steps

That’s all – we have a functional version of React now. Lets take a closer look at what we built:

-   Supports HTML elements, such as `<div />` and `<p />`
-   Supports both functional and class components.
-   Handles children, state, props, events and other attributes.
-   Supports initial rendering and re-rendering.

The main purpose of this workshop was to demonstrate core principles of React internal structure. However, some 
features were left out and this implementation serves as a foundation for you extend with these features.

### Remove the class cache

In our implementation, we used a class cache to keep track of instantiated classes. However, this approach is flawed 
and not at all how React actually does it. If, for example, the order of components changes between renders, we will 
retrieve the wrong class instance from the cache.

You might also have noticed that we have some unimplemented functions in `VDomNode` and `VCompisteNode`. Instead of 
calling `mount` again for virtual nodes when re-renders, we should in fact call `update` and update the nodes.
The way to handle stateful components between renders is to keep an instance of the instantiated component as a 
class property in `VCompositeNode`, and this is where `getPublicInstance` comes in to play.

On calling the `update` function in `VDomNode`, when looping through children, we can retrieve and check if new 
react elements are of the 
same `type` that they were the last time we rendered. We can then update, append, or remove nodes accordingly.

In `src/solution/react-dom/react-dom` we have provided a more advanced implementation that you can look at for inspiration.

### Lifecycle methods

React components have several "lifecycle methods" that you can override to run code at a particular time. For instance, to run code after the component mounts, we can override `Component.componentDidMount`.

Read about the lifecycle methods in [the documentation](https://reactjs.org/docs/react-component.html#the-component-lifecycle) and try to implement them.

### More advanced reconciliation

Every time we change the state of one our components in our application, the DOM gets updated to reflect the new state.
Frequent DOM manipulations affects performance and should be avoided.
To avoid this we should minimize the number of manipulations.

There are multiple ways to reduce the number of manipulations, like reusing HTML elements, such as `<div/>`, or using the `key` prop of children to determine which child to update.

> If an element type in the same place in the tree “matches up” between the previous render and the next one, React reuses the existing host instance.
> React only updates the properties that are absolutely necessary. For instance, if a Component's `className` prop is the only thing on the Component that changed, then that's the only thing that React needs to update.
> Source: https://overreacted.io/react-as-a-ui-runtime/#reconciliation

Our implementation renders the whole application regardless of which part of the application triggered the re-render.
To further improve the performance of our implementation, we can add `_dirty` to the component that changed.
This way we are able to only re-render the subtree that changed.
