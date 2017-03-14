# Bulk & Selection Plugins

The Bulk and Selection plugins compliment each other. After selecting multiple rows, the user will most likely want to perform a bulk action on the selected rows such as altering them to have the same value.

When using the selection plugin, the selected rows are captured in the selection state.

#### The subdivision of state

Each slice of state managed by grid is stored in separate objects inside the grid state atom:

```
// grid
const columnData = this.props.grid.get('state-key');
console.log(columnData.toJS()); <-- only column data

// dataSource
const rowData = this.props.dataSource.get('state-key');
console.log(rowData.toJS()); <-- only row data

// selection
const selectedIds = this.props.selection.get('state-key').get("indexes");
```

#### Get Selected Ids

In general, as with all redux components/app, if you care about a piece of state, you must declare that by using `connect`. In this example, we will connect our component to listen to the grid and selection state:

```
const mapStateToProps = (state) => ({
  grid: state.grid,
  selection: state.selection,
});
```

Selection state is an [Immutablejs Ordered Map](https://facebook.github.io/immutable-js/docs/#/OrderedMap)

```
const getSelectedIds = ()=> {

   const selectedIds = selection.get('state-key').get('indexes');

   if (selectedIds !== undefined) {
       return selectedIds;
    } else {
        console.warn('no indexes were found');
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
