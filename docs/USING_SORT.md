## Sorting Columns

Let's consider this [Sticky example](http://react-redux-grid.herokuapp.com/Sticky)

If you click on the address column, you can see all the rows change so that it's now sorted alphabetically by the address. If you click the same column again, it will sort in reverse order. 

Now what if you try to get the rows in this new order?

```
const rows = this.props.dataSource.get('sticky').get('currentRecords').toJS();
```

In this case, rows has the original order not the new order. You want to use the "data" property instead of the "currentRecords".


```
const dataRecords = this.props.dataSource.get('sticky').get('data');
const sortedRows = dataRecords.toArray().map(item => {
  return item.toJS()
});
```

dataRecords is an ImmutableJS list in the new sorted order which can be converted to an array of objects also in this new sorted order. 

## Listening to Sort Changes

In another reducer, you may wish to listen to any sort changes to capture the new order and trigger state change which other components could respond to and update accordingly. 

In your reducer, you would listen for the SORT_DATA type (see [Types](docs/USING_TYPES.md)) with an action that has a data property, an ImmutableJS List of the new sorted order.  

```
case ActionTypes.SORT_DATA:   
  return Object.assign({}, state, {
    searchResults: action.data
  })                     
```

Otherwise, if you wanted to use an array of objects, you might need to convert it 


```
case ActionTypes.SORT_DATA:   
      
  const sortedRows = action.data.toArray().map(item => {
    return item.toJS()
  });

  return Object.assign({}, state, {
    searchResults: sortedRows
  })
``` 

Furthermore, if you had another array called searchResults that you wanted to update and match this new order, you could map over the sorted array and update each item.  


```
case ActionTypes.SORT_DATA:   
      
  const sortedRows = action.data.toArray().map(item => {
    return item.toJS()
  });

  let newSortedSearchResults = [];
  sortedRows.map( ( sortedItem,sortedIndex) => {
     state.searchResults.map( (searchItem, searchIndex) => {
       if (searchItem.id === sortedItem.id) {
         newSortedSearchResults.push({...searchItem, id: sortedIndex, _key: "row-" + sortedIndex}); 
        } 
     }); 
  });

  return Object.assign({}, state, {
    searchResults: newSortedSearchResults
  })
``` 