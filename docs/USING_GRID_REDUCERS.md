# Grid Reducers

The grid component state is managed by a group of small reducers, rather than a single object. This makes component updates more efficient, and more maintainable. However, this can result in some confusion when a developer would like to import the grid component with their own custom store.

## Best Practice

Generally, developers will be using the grid component, but not the built in store, relying on a store they instantiate for their own application state. This is the preferred design, and you can add the grid `reducers` to your own `rootReducer` very easily.

### Example `./reducers/index.js`

````js
import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';

import myAppReducer from './customReducers/app';
import myDataReducer from './customReducers/data';

export const rootReducer = combineReducers({
    myAppReducer,
    myDataReducer,
    nested: combineReducers(gridReducers)
})

export default rootReducer;
````

On the initialization of the store, both custom `reducers` and the grid `reducers` will be joined in the `combineReducer` function, which will enable all grid functionality, as well as custom app functionality. **This is the easiest way to get started.**

### Importing a subset of grid Reducers

If you'd like to keep your `rootReducer` as small as possible, and you know you only need a subset of the grid functionality, you can only import the `reducers` you need. The `reducers` have been divided into their individual roles, where a few provide core functionality, and others only serve grid plugins.

List of Reducers

````js
export const Reducers = {
    bulkAction,
    dataSource,
    editor,
    errorHandler,
    grid,
    loader,
    menu,
    pager,
    selection
};
````

#### Core Grid Reducers (necessary for all default functionality)

1. dataSource
2. grid

#### Optional Reducers, that enable further functionality

1. bulkAction
2. editor
3. errorHandler
4. loader
5. menu
6. pager
7. selection

### Example `./reducers/index.js` where only core reducers are used

````js
import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';

import myAppReducer from './customReducers/app';
import myDataReducer from './customReducers/data';

export const rootReducer = combineReducers({
    myAppReducer,
    myDataReducer,
    grid: gridReducers.grid,
    dataSource: gridReducers.dataSource
});

export default rootReducer;
````

## Dynamic Reducer Keys

If the `reducer` names clash with your own reducers, you have the option of changing the keys by providing additional configuration to a grid instantiation.

````js
import { Grid, Reducers } from 'react-redux-grid';

export const DynamicReducerKeys = {
    customNameForBulkAction: Reducers.bulkAction,
    gridDataName: Reducers.dataSource,
    gridEditorName: Reducers.editor,
    theseKeysCanBeAnything: Reducers.dataSouce
};

const config = {
    data,
    store,
    reducerKeys: DynamicReducerKeys
};

const grid = <Grid { ...config } />;
````

## Nested Grid Reducers

If you want to hide grid reducers from the root of your state:

````js
import { combineReducers } from 'redux';
import { Reducers as rootReducer } from 'react-redux-grid';

import myAppReducer from './customReducers/app';
import myDataReducer from './customReducers/data';

export const rootReducer = combineReducers({
    myAppReducer,
    myDataReducer,
    nested: rootReducer
});

export default rootReducer;


import { Grid, Reducers } from 'react-redux-grid';

const config = {
    data,
    store,
    reducerKeys: 'nested'
};

const grid = <Grid { ...config } />;


````
