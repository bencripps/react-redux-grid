# Bulk & Selection Plugins

The Bulk and Selection plugins compliment each other. After selecting multiple rows, the user will most likely want to perform a bulk action on the selected rows such as altering them to have the same value. 

The selection plugin turns the first column into checkboxes so that rows can be selected and unselected. The selected rows are captured in the selection state. 

#### grid vs dataSource vs selection reducers

```
// grid
const columnData = this.props.grid.get('sticky');
console.log(JSON.stringify(columnData) ); <-- only column data

// dataSource
const rowData = this.props.dataSource.get('sticky');
console.log(columnData.toJS()); <-- only row data 

// selection
const selectedIds = this.props.selection.get('sticky').get("indexes");
```

#### Get Selected Ids

In order to get the selected ids, you need to use the selection state. 

```
const mapStateToProps = (state) => ({
  grid: state.grid,
  selection: state.selection,
});
```

Selection state is an [Immutablejs Ordered Map](https://facebook.github.io/immutable-js/docs/#/OrderedMap)

```
const getSelectedIds = ()=> {

   const bulkMap = selection.get("bulk"); // selection is React-Redux-Grid reducer available from the store
   const selectedIds = bulkMap.get("indexes");

   if (undefined !== selectedIds) {
       return selectedIds; 
    } else {
        // you could dispatch a notification... 
        // this.props.displayWarningRequestMessage("No rows selected");
        console.warn("BulkPage selectedIds were false!");
        return [];
    }  
};
```

If you set activeCls to true, the rows will change color as you hover over and click on them and the checkbox will also toggle state.

```
SELECTION_MODEL: {
  mode: 'checkbox-multi',
  enabled: true,
  allowDeselect: true,
  activeCls: 'active',
  selectionEvent: 'singleclick'
},
```

If you set activeCls to false, the rows will change color as you hover over and click on them but the checkbox will not toggle state until you actually click on the checkox. 


```
SELECTION_MODEL: {
  mode: 'checkbox-multi',
  enabled: true,
  allowDeselect: true,
  activeCls: 'false',
  selectionEvent: 'false'
},
```   

#### Bulk & Selection Plugins 

```
export const plugins = {
    SELECTION_MODEL: {
        mode: 'checkbox-multi',
        enabled: true,
        allowDeselect: true,
        activeCls: 'active', // the css for the active cell 
        selectionEvent: 'singleclick' // singleclick vs doubleclick 
    },
    BULK_ACTIONS: {
        enabled: true,
        actions: [
            {
                text: 'Move',
                EVENT_HANDLER: () => {

                }
            },
            {
                text: 'Add',
                EVENT_HANDLER: () => {

                }
            }
        ]
    }
};
```
