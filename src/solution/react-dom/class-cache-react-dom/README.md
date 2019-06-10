# ReactDOM - Class-Cache

Here you will find the proposed solution to the implementation of ReactDOM with a class-cache.

The reason behind the class-cache solution is to simplify the implementation.
With the class-cache we can just replace every node on a render of the DOM and just pop 
stateful components from the cache whenever we encounter one. That way, we won't loose that state of the component 
when re-rendering. This is instead of having to traverse the virtual-DOM tree and compare every child-node with it's 
previous instance and then removing, replacing or appending that child to the node.
