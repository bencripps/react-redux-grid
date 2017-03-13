# Types

In you use redux logging tool like redux-logger, you can see the action types that React-Redux-Grid produces as you are interacting with the grid. 

You have may other components that may wish to listen to these commands and you can use the React-Redux-Grid types in your own reducers.

#### Grid Types

import { applyGridConfig } from 'react-redux-grid';

```
switch (action.type) {
    case applyGridConfig.SET_DATA:
      return Object.assign({}, state, {
        dataSetAction: true,
      })
    default:
        return Object.assign({}, state, {
        default: "hello world"
      })
}  
```

#### Action Types

import { ActionTypes } from 'react-redux-grid';

```
switch (action.type) {
    case ActionTypes.SET_LOADING_STATE:
      return Object.assign({}, state, {
        isLoading: true,
      })
    default:
        return Object.assign({}, state, {
        default: "hello world"
      })
}  
```