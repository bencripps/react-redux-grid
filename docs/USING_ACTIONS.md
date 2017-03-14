## Actions

Each of the reducers: grid, pager, selection, etc have supporting actions. You may wish to dispatch these actions from other areas of your application outside of the grid. For instance, you could select all/deselect all rows in a grid from another component in your application.


## Selection Actions

Add the actions

```
import { Actions } from 'react-redux-grid';
```

Map them to this.props

```
const mapDispatchToProps = (dispatch) => {
  return {
    deselectAll: stateKey => {
      dispatch(Actions.SelectionActions.deselectAll(stateKey))
    },
  }
}
```

Use them in your components from this.props

```
  // get the all selection row ids
  const gridMap = this.props.selection.get("myGridStateKey");
  const selectedIds =  gridMap.get("indexes");
  
  // call a bulk selection action to deselect all the rows  
  const stateKey = "myGridStateKey";
  this.props.deselectAll(stateKey); 

``` 