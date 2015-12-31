# React-Redux Grid

A Grid Component written in [React](https://facebook.github.io/react) using the [Redux](https://github.com/rackt/redux) Pattern.

[Demo](url/to/demo)

##Feature List

1. Local and/or Remote Data Source
2. Local and/or Remote Pagination
3. Extensive and extenable Column Definitions
4. Draggable Column Width/Resizing
5. Sortable Columns
6. Grid Action Menus
7. Bulk Action Toolbar
8. Selection Model (Single, MultiSelect, Checkbox)
9. Event Handling for all kinds of DOM Events (List Below)
10. Extendable and Modular Style Built with JavaScript
11. Loading Mask
12. Built-in Error Handling Module

##Which Store do I use?

Because Redux imposes a single store pattern, it's very probable that you will need to use this grid with your own store. Well that's ok! The `demo` folder includes:

1. `index.html`
2. `entry.js` The entry point for webpack to build all required assets
3. `provider.jsx` The Redux entry point, where your store will be declared

This component will work out of the box, without installing a custom store. A store has been created within the components source files, but this store will be entirely ignored if a different store is passed to the grid.

In the demo `provider.jsx`, we are simply passing the store at path`'../src/store/store';`. To use your own store, simply provide your own store (recommended) or overwrite the source store.

If you elect to use a custom store, please be sure to include the necessary reducers for the core grid features and any plugins you wish to use.

## Plugins

All Features are implementd as plugins. Plugin defaults are described as below. Their default values can be modified, and new plugins can be introduced with very little modification to core components.

## Columns

	export const columns = [
	    {
	        name: 'Name',
	        width: '10%',
	        className: 'additional-class',
	        renderer: () => { return 'Name of Column'; },
	        HANDLE_CLICK: () => { console.log('Header Click'); }
	    }
	];

Column Defaults:

1. `name`: `string`, title of column 
2. `width`: `string | int`, width of column (if none is provided, a default width will be applied)
3. `className`: `string`, additional class names to apply to columns header output
5. `HANDLE_CLICK`: `func`, click handler assigned to column
6. `resizable`: `boolean`, whether this column can be resized


## Column Manager

	export const plugins = {
	    COLUMN_MANAGER: {
            resizable: false
	        defaultColumnWidth: `${100 / columns.length}%`,
            minColumnWidth: 10
	    }
	}

Column Manager Defaults

1. `resizable`: `boolean`, will set all columns to resizable. This parameter will not override columns that have declared they are not resizable from the columns array
2. `defaultColumnWidth`: `string template`, if no column width is provided, columns will be divided equally. this can be overwritten by providing a new string template
3. `minColumnWidth`: `int`, the minimum width a column can be dragged to

## Pagination

	export const plugins = {
	    PAGER: {
	        enabled: true,
	        pagingType: 'remote',
	        pagingSource: 'url/to/grid/data',
	        toolbarRenderer: (pageIndex, pageSize, total, currentRecords, recordType) => {
	            return `${pageIndex * pageSize} through ${pageIndex * pageSize + currentRecords} of ${total} ${recordType} Displayed`;
	        }
	    }
	};

Pagination Defaults:

1. `enabled`: `boolean`, default value: `true`
2. `pagingType`: `string`, default value; `local`, possible values: `['local', 'remote']`
3. `pagingSource`: `string`, url for remote grid data
4. `toolbarRenderer`: `func`, a function which returns the template that describes current pagination state

## Selection Model

	export const plugins = {
	    SELECTION_MODEL: {
	        mode: 'single',
	        enabled: true,
	        allowDeselect: true,
	        activeCls: 'active-class',
	        selectionEvent: 'singleclick'
	    }
	};

Selection Model Defaults: 

1. `mode`: `string`, determines whether a single value, or multiple values can be selected, and whether a checkbox column will be used, possible values `['single', 'multi', 'checkbox-single', 'checkbox-multi']`
2. `enabled`: `boolean`, whether the selection model class is initialized
3. `allowDeselect`: `boolean`, whether a value can be deselected
4. `activeCls`: `string`, the class applied to active rows upon selection
5. `selectionEvent`: `string`, the browser event which triggers the selection event, possible values `['singleclick', 'doubleclick']`

## Error Handler

	export const plugins = {
	    ERROR_HANDLER: {
	        defaultErrorMessage: 'AN ERROR OCURRED',
	        enabled: true
	    }
	};

Error Handler Defaults

1. `defaultErrorMessage`: `string`, the default error message to display when no error information is available
2. `enabled`: `string`, whether the error handler should be used

## Loader

	export const plugins = {
	    LOADER: {
	        enabled: true
	    }
	};

Loader Defaults:

1. `enabled`: `boolean`, whether the default loading mask should be used

Loader css can be modified or overwritten using `src/style/components/plugins/loader/loadingbar.styl`

## Bulk Actions

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

Bulk Action Defaults

1. `enabled`: `string`, whether the bulk action toolbar should be used
2. `actions`: `array of objects`, the actions (including button text, and event handler) that will be displayed in the bar

## Events

All grid events are passed in as a single object. 

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

## Style

All core components and plugins have corresponding `.styl` files that can be extended or overwritten. Class names have also been modularized and are available to modify or extend within `src/constants/gridConstants.js`

	export const CSS_PREFIX = 'react-grid';

	export const CLASS_NAMES = {
	    CONTAINER: 'container',
	    TABLE: 'table',
	    HEADER: 'header',
	    ROW: 'row',
	    CELL: 'cell',
	    PAGERTOOLBAR: 'pager-toolbar',
	    EMPTY_ROW: 'empty-row',
	    LOADING_BAR: 'loading-bar',
	    ACTIVE_CLASS: 'active-class',
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
	            CONTAINER: 'inline-editor'
	        }
	    },
	    GRID_ACTIONS: {
	        CONTAINER: 'action-container',
	        SELECTED_CLASS: 'action-menu-selected',
	        MENU: {
	            CONTAINER: 'action-menu-container',
	            ITEM: 'action-menu-item'
	        }
	    }

	};