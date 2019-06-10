# ReactDOM

Here you will find the proposed solution to the implementation of ReactDOM without a class-cache.

This version of ReactDOM is implemented without a class-cache. The implementation is a little bit more advanced than 
the class-cache version. Stateful components are stored as instances on the `VCompositeNode` instead of a 
"centralized" cache, as we did with the class-cache. We there need to traverse the tree of virtual-DOM nodes and 
compare them to the previous virtual-DOM node. We then remove, append, replace, or update the children of nodes 
accordingly to the changes made since last render. This way, when the type (and order) of a child node that is 
stateful has not changed, we will just update the node with new props and therefor the state is kept in tact.
