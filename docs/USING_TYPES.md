# Action Types

If you want to listen for interal `react-redux-grid` Actions, you can import them and add them to your own reducers.

```js
import { ActionTypes } from 'react-redux-grid';

switch (action.type) {
    case ActionTypes.SET_LOADING_STATE:
        // handle new loading state for grid
}
```
