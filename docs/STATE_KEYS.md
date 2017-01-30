
## What's a `stateKey`?

A `stateKey` is a unique ID associated with each grid instantiation, and is a required parameter. Because all grid data is stored in a `reducer`, we need a unique key to access each grid's subsection of data in these objects. If a grid is instantiated without a `stateKey`, it will will throw a user error in the console.

You can think of a `stateKey` like the grid's name, as it will be used to create state, but also as the unique token from which you can grab state from the store. In short, please provide a unique `stateKey` to each grid you create.
