# React-Redux Grid

[![npm version](https://badge.fury.io/js/react-redux-grid.svg)](https://badge.fury.io/js/react-redux-grid)
[![Build Status](https://travis-ci.org/bencripps/react-redux-grid.svg?branch=master)](https://travis-ci.org/bencripps/react-redux-grid)
[![Dependency Status](https://www.versioneye.com/user/projects/571b8782fcd19a0045441c8d/badge.svg?style=flat)](https://www.versioneye.com/user/projects/571b8782fcd19a0045441c8d)
[![npm](https://img.shields.io/npm/dm/react-redux-grid.svg?maxAge=2592000?style=plastic)]()
[![codecov](https://codecov.io/gh/bencripps/react-redux-grid/branch/master/graph/badge.svg)](https://codecov.io/gh/bencripps/react-redux-grid)


A Grid Component written in [React](https://facebook.github.io/react) using the [Redux](https://github.com/rackt/redux) Pattern.

[Demo](http://react-redux-grid.herokuapp.com/)

## Feature List

1. Local and/or Remote Data Source
2. Local and/or Remote Pagination
3. Extensive and extendable Column Definitions
4. Draggable Column Width/Resizing
5. Draggable Column Ordering
5. Sortable Columns
6. Grid Action Menus
7. Bulk Action Toolbar
8. Selection Model (Single, MultiSelect, Checkbox)
9. Event Handling for all kinds of DOM Events (List Below)
10. Extendable and Modular Style Built with JavaScript
11. Loading Mask
12. Built-in Error Handling Module

## Installation

Add Grid to `node_modules`

```bash
npm install react-redux-grid
```

Include Grid in Webpack Build via Loaders

```javascript
var loaders = [
    {
        test: /\.js$|\.jsx$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /[\\\/]node_modules[\\\/](?!react-redux-grid)/,
    },
    {
        test: /\.styl$/,
        exclude: /[\\\/]node_modules[\\\/](?!react-redux-grid)/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
    }
];
```

Because the grid gets installed in the `node_modules` directory, we must add the specific folder to the `exclude` config entry in webpack. This way, when you `import` the grid, webpack will know which loader to use to parse the files.

If you're using the fonts that come bundles with the grid, you will also need an additonal loader:

```javascript
{
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loaders: ['url-loader?limit=10000&mimetype=application/font-woff' ]
}
```

## Usage

```javascript
import { Grid, Store } from 'react-redux-grid'

const config = {
    store: Store,
    stateKey: 'unique-grid-id',
    ...data
};

const GridInstance = <Grid { ...config } />
```

## Which Store do I use?

Because Redux imposes a single store pattern, it's very probable that you will need to use this grid with your own store. Well that's ok! The `demo` folder includes:

1. `index.html`
2. `entry.js` The entry point for webpack to build all required assets
3. `provider.jsx` The Redux entry point, where your store will be declared

This component will work out of the box, without installing a custom store. A store has been created within the components source files, but this store will be entirely ignored if a different store is passed to the grid.

In the demo `provider.jsx`, we are simply passing the store at path`'../src/store/store';`. To use your own store, simply provide your own store (recommended) or overwrite the source store.

If you elect to use a custom store, the core component's reducers are also exposed from within the core export:

```javascript
const Reducers = {
    DataSource: datasource,
    Grid: grid,
    BulkActions: bulkaction,
    Editor: editor,
    ErrorHandler: errorhandler,
    Filter: filter,
    Loader: loader,
    Menu: menu,
    Pager: pager,
    Selection: selection
};
```

You can import a reducer like so:

```javascript
import { Reducers } from 'react-redux-grid';

const dataSource = Reducers.DataSource;

const rootReducer = combineReducers({
    dataSource,
    yourCustomReducer
};
```

## What's a `stateKey`?

A `stateKey` is a unique id associated with each grid instantiation, and is a required parameter. Because all grid data is stored in a `reducer`, we need a unique key to access each grid's subsection of data in these objects. If a grid is instantiated without a `stateKey`, it will will throw a user error in the console. If a duplicate `stateKey` is passed to grid it will throw a user error in the console. In short, please provide a unique `stateKey` to each grid you create.

## Data

Data can be provided to a grid in two ways.

1. As a Local Data Source (in memory)
2. As a Remote Data Source, via AJAX (by providing a route, or a function which returns a `Promise`)

If data is provided as a local variable it should be described as an array of objects, and declared using `data = [];`.

If data is provided as a request route, it should be described as a string or a function and declared using `dataSource = path/to/data/source;`.

If data is provided as a function, it should return a `Promise`



Examples of both cases:

### Local

```javascript
const data = [
    {
        name: 'Michael Jordan',
        position: 'Shooting Guard'
    },
    {
        name: 'Charles Barkley',
        position: 'Power Forward'
    }, ...
];

const grid = <Grid data={ data } />
```

### Remote -- as a string

```javascript
const dataSource = 'route/to/your/data/source';

const grid = <Grid dataSource={ dataSource } />
```

### Remote -- as a function which returns a promise

```javascript
const dataSource = () => {

    return new Promise((success) =>{

        return $.get({
            method: 'GET',
            route: '/route/to/your/data',
        }).then((response) => {

            // important to note, that the grid expects a data attribute
            // on the response object!

            const gridResponse = {
                data: response.items,
                success: true
            };

            success(gridResponse);
        });

    });
};

const grid = <Grid dataSource= { dataSource } />
 ```

## Plugins

All Features are implemented as plugins. Plugin defaults are described as below. Their default values can be modified, and new plugins can be introduced with very little modification to core components.

To add a plugin, simply create a file, and add the JSX to `src/grid.jsx`. The plugin will not interfere with other components or their associated state.

## Columns
```javascript
export const columns = [
    {
        name: 'Name',
        dataIndex: 'name',
        editor: '<input type="text" required />',
        width: '10%',
        className: 'additional-class',
        renderer: ({ column, value, row }) => {
               return (
                   <span> Name: { value } </span>
                   );
           },
        hidden: false,
        placeholder: 'Name',
        validator: ({ value, values }) => {
            return value.length > 0;
        },
        change: ({ values }) => {
            return {
                otherColDataIndex: 'newValue'
            };
        },
        disabled: ({ value, values }) => {
            if (value === 'ShouldDisabled') {
                return true;
            }
            return false;
        },
        hideable: false,
        resizable: false,
        moveable: false,
        HANDLE_CLICK: () => { console.log('Header Click'); }
    }
];
```

Column Defaults:

1. `name`: `string`, title of column
2. `dataIndex`: `string | arrayOf(string)`, the key accessor for the column value (required parameter). if data is provided as a complex object, deeply nested data can be accessed by providing an array of keys

Example:
```javascript
const data = {
    outer: {
        middle: {
            inner: 'rowValue'
        }
    }
};
```

You can access this data by providing the column the following dataIndex:

```javascript
const column = {
    name: 'Value',
    dataIndex: ['outer', 'middle', 'inner']
};
```

3. `editor`: `jsx element`, when an editor is used, this element will be rendered in place of the edited cell
4. `width`: `string | int`, width of column (if none is provided, a default width will be applied)
5. `className`: `string`, additional class names to apply to columns header output
6. `renderer`: `string | jsx`, a function which returns the cell contents for this column
7. `hidden`: `boolean`, whether the column is hidden or visible
8. `hideable`: `boolean`, whether the column can be hidden
9. `resizable`: `boolean`, whether this column can be resized
10. `moveable`: `boolean`, whether this column can be moved
10. `placeholder`: `string`, the placeholder that will be used for the editor input
10. `validator`: `func`, a func that should return a boolean, to determine if the newly input value is valid
11. `change`: `func`, a func that should return an object where keys are the dataIndex of affected columns, and the values will be the new values associated with that dataIndex.
12. `disabled`: `bool || func`, whether the field should be disabled while in edit mode.
13. `HANDLE_CLICK`: `func`, click handler assigned to column

## Editor
```javascript
export const plugins = {
    EDITOR: {
        type: 'inline',
        enabled: true,
        focusOnEdit: true
    }
}
```

Editor Defaults

1. `type`: `string`, (`inline`), currently there is only 1 editor defined, in the future, other editors will be available
2. `enabled`: `boolean`, if true, an editor will be rendered
3. `focusOnEdit`: `boolean`, focus the first editable input when an edit event occurs (defaults to true)


## Column Manager
```javascript
export const plugins = {
    COLUMN_MANAGER: {
        resizable: false
        defaultColumnWidth: `${100 / columns.length}%`,
        minColumnWidth: 10,
        moveable: true,
        headerActionItemBuilder: () => {},
        sortable: {
            enabled: true,
            method: 'local',
            sortingSource: 'http://url/to/sortingSource'
        }
    }
}
```

Column Manager Defaults

1. `resizable`: `boolean`, will set all columns to resizable. This parameter will not override columns that have declared they are not resizable from the columns array
2. `defaultColumnWidth`: `string template`, if no column width is provided, columns will be divided equally. this can be overwritten by providing a new string template
3. `minColumnWidth`: `int`, the minimum width a column can be dragged to
4. `moveable`: `boolean`, whether the columns can be reordered by drag
5. `headerActionItemBuilder`: `func`, build a custom jsx component to be used as the header action items
6. `sortable`: `object`, an object that describes whether columns can be sorted
6a. `sortable.enabled`: `boolean`, whether sorting is enabled at the grid level
6b. `sortable.method`: `string`, whether sorting will execute locally, or remotely, possible values: `['local', 'remote']`
6c. `sortable.sortingSource`: `string`, where sorting data will be retrieved (a required parameter for remote sorting)

## Pagination
```javascript
export const plugins = {
    PAGER: {
        enabled: true,
        pagingType: 'remote',
        pagingSource: 'url/to/grid/data', // not required, will default to dataSource
        toolbarRenderer: (pageIndex, pageSize, total, currentRecords, recordType) => {
            return `${pageIndex * pageSize} through ${pageIndex * pageSize + currentRecords} of ${total} ${recordType} Displayed`;
        },
        pagerComponent: false
    }
};
```

Pagination Defaults:

1. `enabled`: `boolean`, default value: `true`
2. `pagingType`: `string`, default value; `local`, possible values: `['local', 'remote']`
3. `pagingSource`: `string`, url for remote grid data (if `pagingSource` is null, the toolbar will default to the original dataSource passed to grid)
4. `toolbarRenderer`: `func`, a function which returns the template that describes current pagination state
5. `pagerComponent`: `jsx element`, if you'd like to pass your own pager in, you can supply a jsx element which will replace the pager entirely

### Note about using a Custom Pager

You can pass a `JSX` element to replace the pager entirely. This can be either a connected or unconnected component. To dispatch paging events, you can use the `Actions.PagerActions.setPageIndexAsync` or `Actions.PagerActions.setPage` that are exposed from the main export.

Example:
```javascript
// my custom actionHandler that my custom component uses

export const setPageIndex = (pageIndex, pageSize, dataSource) => {
    return (dispatch) => {
        // dispatch an event that the grid is listening for, which updates the current records
        dispatch(
            Actions.PagerActions
                .setPageIndexAsync(pageIndex, pageSize, dataSource)
        );

        // dispatch an event that my custom toolbar is listening for
        // to update the current pageIndex
        dispatch({
            type: SET_PAGE_INDEX,
            pageIndex
        });

    };
};
```

## Grid Actions (Row Menu Actions)
```javascript
export const plugins = {
    GRID_ACTIONS: {
        iconCls: 'action-icon',
        onMenuShow: ({ columns, rowData }) => {

            console.log('This event fires before menushow');

            if (rowData.isDisabled) {
                return ['menu-item-key'] // this field will now be disabled
            }

        },
        menu: [
            {
                text: 'Menu Item',
                key: 'menu-item-key',
                EVENT_HANDLER: () => {
                    alert('Im a menu Item Action');
                }
            }
        ]
    }
};
```

Grid Action Defaults

1. `iconCls`: `string`, class to be used for the action icon
2. `menu`: `arrayOf(object)`, menu items
3. `onMenuShow`: `func`, a method that fires upon menu action click. @return an array of `keys` to disable menu items that correspond with these keys.

### Notes about Menu Items

Each object must contain a unique key relative to it's parent array. These keys will be used as the JSX element key.

## Sticky Header/Footer

If you'd like to disable scrolling within the grid container, in favor of an infinite scroll UI you can use the sticky header/footer feature.
```javascript
export const plugins = {
    STICKY_HEADER: {
        enabled: true,
        scrollTarget: '#my-scrollable-div',
        listener: customFunc
    },
    STICKY_FOOTER: {
        enabled: true,
        scrollTarget: '#my-scrollable-div',
        listener: customFunc
    }
}
```

Sticky Header/Footer Defaults

1.`enabled`: `boolean`, whether the sticky header is initialized
2. `scrollTarget`, `string`, optional, useds as a selector to find the scrollable parent
3. `listener`, `func`, optional, custom function to be called on scroll

## Selection Model
```javascript
export const plugins = {
    SELECTION_MODEL: {
        mode: 'single',
        enabled: true,
        editEvent: 'singleclick',
        allowDeselect: true,
        activeCls: 'active-class',
        selectionEvent: 'singleclick'
    }
};
```

Selection Model Defaults:

1. `mode`: `string`, determines whether a single value, or multiple values can be selected, and whether a checkbox column will be used, possible values `['single', 'multi', 'checkbox-single', 'checkbox-multi']`
2. `editEvent`: `string`, (`singleclick`, `doubleclick`, `none`) what type of mouse event will trigger the editor
3. `enabled`: `boolean`, whether the selection model class is initialized
4. `allowDeselect`: `boolean`, whether a value can be deselected
5. `activeCls`: `string`, the class applied to active rows upon selection
6. `selectionEvent`: `string`, the browser event which triggers the selection event, possible values `['singleclick', 'doubleclick']`

## Error Handler
```javascript
export const plugins = {
    ERROR_HANDLER: {
        defaultErrorMessage: 'AN ERROR OCURRED',
        enabled: true
    }
};
```

## Filter Container and Menu
```javascript
export const plugins = {

    FILTER_CONTAINER: {
        enabled: true,
        method: 'local',
        filterSource: 'http://url/to/pagingdata',
        component: false,
        enableFilterMenu: true
        fields: [
            {
                name: 'name',
                label: 'Name',
                placeholder: 'Name',
                type: 'text'
            }
        ]
    }
};
```

Filter Container and Menu Defaults

1. `enabled`: `string`, whether the container should be used
2. `method`: `string`, what type of filter method should be used, possible values: `['local', 'remote']`
3. `filterSource`, `string`, if remote filtering is used, a URI is required
4. `enableFilterMenu`, `boolean`, whether a filter menu should be created
5. `component`, `jsx`, if you'd like to add a custom component on top of the grid, provide a jsx component
6. `fields`: `array of objects`, an array containing objects that desribe filter fields to be registered in the filter menu
6a. `field.object`, `object`, fields require a `name` parameter, and the name should correspond with a column name.

Error Handler Defaults

1. `defaultErrorMessage`: `string`, the default error message to display when no error information is available
2. `enabled`: `string`, whether the error handler should be used

## Loader
```javascript
export const plugins = {
    LOADER: {
        enabled: true
    }
};
```

Loader Defaults:

1. `enabled`: `boolean`, whether the default loading mask should be used

Loader css can be modified or overwritten using `src/style/components/plugins/loader/loadingbar.styl`

## Bulk Actions
```javascript
export const plugins = {
    BULK_ACTIONS: {
        enabled: true,
        actions: [
            {
                text: 'Bulk Action Button',
                EVENT_HANDLER: () => {
                    console.log('Doing a bulk action');
                }
            }
        ]
    }
};
```

Bulk Action Defaults

1. `enabled`: `string`, whether the bulk action toolbar should be used
2. `actions`: `array of objects`, the actions (including button text, and event handler) that will be displayed in the bar

## Events

All grid events are passed in as a single object.
```javascript
export const events = {
    HANDLE_CELL_CLICK: (cell, reactEvent, id, browserEvent) => {
        console.log('On Cell Click Event');
    },
    HANDLE_CELL_DOUBLE_CLICK: (cell, reactEvent, id, browserEvent) => {
        console.log('On Cell Double Click Event');
    },
    HANDLE_ROW_CLICK: (row, reactEvent, id, browserEvent) => {
        console.log('On Row Click Event');
    },
    HANDLE_ROW_DOUBLE_CLICK: (row, reactEvent, id, browserEvent) => {
        console.log('On Row Double Click Event');
    },
    HANDLE_BEFORE_SELECTION: () => {
        console.log('On Before Selection')
    },
    HANDLE_AFTER_SELECTION: () => {
        console.log('On After Selection');
    },
    HANDLE_AFTER_INLINE_EDITOR_SAVE: () => {
        console.log('On After Save Inline Editor Event');
    },
    HANDLE_BEFORE_BULKACTION_SHOW: () => {
        console.log('On Before Bulk Action Show');
    },
    HANDLE_AFTER_BULKACTION_SHOW: () => {
        console.log('On After Bulk Action Show');
    }
};
```

## Style

All core components and plugins have corresponding `.styl` files that can be extended or overwritten. Class names have also been modularized and are available to modify or extend within `src/constants/gridConstants.js`
```javascript
export const CSS_PREFIX = 'react-grid';

export const CLASS_NAMES = {
    ACTIVE_CLASS: 'active',
    DRAG_HANDLE: 'drag-handle',
    SORT_HANDLE: 'sort-handle',
    SECONDARY_CLASS: 'secondary',
    CONTAINER: 'container',
    TABLE: 'table',
    HEADER: 'header',
    ROW: 'row',
    CELL: 'cell',
    PAGERTOOLBAR: 'pager-toolbar',
    EMPTY_ROW: 'empty-row',
    LOADING_BAR: 'loading-bar',
    DRAGGABLE_COLUMN: 'draggable-column',
    COLUMN: 'column',
    SORT_HANDLE_VISIBLE: 'sort-handle-visible',
    BUTTONS: {
        PAGER: 'page-buttons'
    },
    SELECTION_MODEL: {
        CHECKBOX: 'checkbox',
        CHECKBOX_CONTAINER: 'checkbox-container'
    },
    ERROR_HANDLER: {
        CONTAINER: 'error-container',
        MESSAGE: 'error-message'
    },
    EDITOR: {
        INLINE: {
            CONTAINER: 'inline-editor',
            SHOWN: 'shown',
            HIDDEN: 'hidden',
            SAVE_BUTTON: 'save-button',
            CANCEL_BUTTON: 'cancel-button',
            BUTTON_CONTAINER: 'button-container'
        }
    },
    GRID_ACTIONS: {
        CONTAINER: 'action-container',
        SELECTED_CLASS: 'action-menu-selected',
        MENU: {
            CONTAINER: 'action-menu-container',
            ITEM: 'action-menu-item'
        }
    },
    FILTER_CONTAINER: {
        CONTAINER: 'filter-container',
        INPUT: 'filter-input',
        SEARCH_BUTTON: 'filter-search-button',
        MENU_BUTTON: 'filter-menu-button',
        CLEAR_BUTTON: 'filter-clear-button',
        BUTTON_CONTAINER: 'filter-button-container',
        MENU: {
            CONTAINER: 'advanced-filter-menu-container',
            TITLE: 'advanced-filter-menu-title',
            BUTTON: 'advanced-filter-menu-button',
            BUTTON_CONTAINER: 'advanced-filter-menu-button-container',
            FIELD: {
                CONTAINER: 'advanced-filter-menu-field-container',
                LABEL: 'advanced-filter-menu-field-label',
                INPUT: 'advanced-filter-menu-field-input'
            }
        }
    },
    BULK_ACTIONS: {
        CONTAINER: 'bulkaction-container',
        DESCRIPTION: 'bulkaction-description',
        SHOWN: 'shown',
        HIDDEN: 'hidden'
    }

};
```

## FAQ

#### What if I want to use my own store, but I want to name the reducer keys myself?

This is possible. You simply need to pass the reducer name as a `prop`.
```javascript
const gridProps = {
    reducerKeys: {
        grid: 'YOUR_GRID_REDUCER_KEY'
    },
    store
};

const grid = <Grid { ...gridProps } />;
```

#### I see fonts are included in the package. Do I have to build them with my webpack? Do I have to use them at all?

The fonts will be used by default. If you'd like to remove them from the build process entirely (and thus remove them from the Grid), set a stylus variable!

You can do this via JS, stylus, or webpack:

###### JS
```javascript
const stylus = import('stylus');

stylus.define('$include_fonts', false);
```

###### Stylus
```stylus
$include_fonts = false
```

###### Webpack
```stylus
// variables.styl
$include_fonts = false
```
```javascript
stylus: {
    'import': [
        path.join(__dirname, 'build/variables.styl')
    ]
}
```
