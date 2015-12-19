# React-Redux Grid

A Grid Component written in [React](https://facebook.github.io/react) using the [Redux](https://github.com/rackt/redux) Pattern.

[Demo](url/to/demo)

##Which Store do I use?

Because Redux imposes a single store pattern, it's very probable that you will need to use this grid with your own store. Well that's ok! The `demo` folder includes:

1. `index.html`
2. `entry.js` The entry point for webpack to build all required assets
3. `provider.jsx` The Redux entry point, where your store will be declared

This component will work out of the box, without installing a custom store. A store has been created within the components source files, but this store will be entirely ignored if a different store is passed to the grid.

In the demo `provider.jsx`, we are simply passing the store at path`'../src/store/store';`. To use your own store, simply provide your own store (recommended) or overwrite the source store.

## Features

1. Local and/or Remote Data Souce
2. Local and/or Remote Pagination
3. Event Handling for all kinds of DOM Events

