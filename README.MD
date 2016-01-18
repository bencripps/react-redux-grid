# React-Redux Grid

A Grid Component written in [React](https://facebook.github.io/react) using the [Redux](https://github.com/rackt/redux) Pattern.

[Demo](url/to/demo)

## Feature List

1. Local and/or Remote Data Source
2. Local and/or Remote Pagination
3. Extensive and extenable Column Definitions
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

`npm install react-redux-grid`

## Usage 

	import { Grid, Store } from 'react-redux-grid'

	const gridData = {
		store: Store,
		...data
	};

	const GridInstance = <Grid { ...gridData } />

## Which Store do I use?

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
	        hidden: false,
	        hideable: false,
	        resizable: false,
	        moveable: false,
	        HANDLE_CLICK: () => { console.log('Header Click'); }
	    }
	];

Column Defaults:

1. `name`: `string`, title of column 
2. `width`: `string | int`, width of column (if none is provided, a default width will be applied)
3. `className`: `string`, additional class names to apply to columns header output
4. `renderer`: `func`, a function which returns the column name
5. `hidden`: `boolean`, whether the column is hidden or visible
6. `hideable`: `boolean`, whether the column can be hidden
7. `resizable`: `boolean`, whether this column can be resized
7. `moveable`: `boolean`, whether this column can be moved
8. `HANDLE_CLICK`: `func`, click handler assigned to column


## Column Manager

	export const plugins = {
	    COLUMN_MANAGER: {
            resizable: false
	        defaultColumnWidth: `${100 / columns.length}%`,
            minColumnWidth: 10,
            moveable: true,
            sortable: {
	            enabled: true,
	            method: 'local',
	            sortingSource: 'http://url/to/pagingdata'
        	}
	    }
	}

Column Manager Defaults

1. `resizable`: `boolean`, will set all columns to resizable. This parameter will not override columns that have declared they are not resizable from the columns array
2. `defaultColumnWidth`: `string template`, if no column width is provided, columns will be divided equally. this can be overwritten by providing a new string template
3. `minColumnWidth`: `int`, the minimum width a column can be dragged to
4. `moveable`: `boolean`, whether the columns can be reordered by drag
5. `sortable`: `object`, an object that describes whether columns can be sorted
5a. `sortable.enabled`: `boolean`, whether sorting is enabled at the grid level
5b. `sortable.method`: `string`, whether sorting will execute locally, or remotely, possible values: `['local', 'remote']`
5c. `sortable.sortingSource`: `string`, where sorting data will be retrieved (a required parameter for remote sorting)

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

## Filter Container and Menu

	export const plugins = {
		
		FILTER_CONTAINER: {
	        enabled: true,
	        method: 'local',
	        filterSource: 'http://url/to/pagingdata',
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

Filter Container and Menu Defaults

1. `enabled`: `string`, whether the container should be used
2. `method`: `string`, what type of filter method should be used, possible values: `['local', 'remote']`
3. `filterSource`, `string`, if remote filtering is used, a URI is required
4. `enableFilterMenu`, `boolean`, whether a filter menu should be created
5. `fields`: `array of objects`, an array containing objects that desribe filter fields to be registered in the filter menu
5a. `field.object`, `object`, fields require a `name` parameter, and the name should correspond with a column name. 

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