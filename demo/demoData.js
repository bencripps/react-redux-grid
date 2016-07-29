import React from 'react';

import store from './../src/store/store';
import { Actions } from './../src/actions';
import util from 'util'

export const pageSize = 20;

export const height = '500px';

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
        console.log('On Before Selection');
    },
    HANDLE_AFTER_SELECTION: () => {
        console.log('On After Selection');
    },
    HANDLE_AFTER_INLINE_EDITOR_SAVE: (params) => {
        console.log('On After Save Inline Editor Event');
        console.log(util.inspect(params))
    },
    HANDLE_BEFORE_BULKACTION_SHOW: () => {
        console.log('On Before Bulk Action Show');
    },
    HANDLE_AFTER_BULKACTION_SHOW: () => {
        console.log('On After Bulk Action Show');
    }
};

export const dataSource = 'http://react-redux-grid.herokuapp.com/getfakeData';

export const plugins = {
    COLUMN_MANAGER: {
        resizable: true,
        moveable: true,
        sortable: {
            enabled: true,
            method: 'local',
            sortingSource: 'http://react-redux-grid.herokuapp.com/getfakeData'
        }
    },
    STICKY_HEADER: {
        enabled: true
    },
    STICKY_FOOTER: {
        enabled: true
    },
    EDITOR: {
        type: 'inline',
        enabled: true,
        focusOnEdit: true
    },
    PAGER: {
        enabled: true,
        pagingType: 'remote',
        pagingSource: 'http://react-redux-grid.herokuapp.com/getFakedPagedData'
    },
    LOADER: {
        enabled: true
    },
    SELECTION_MODEL: {
        mode: 'multi',
        enabled: true,
        allowDeselect: true,
        activeCls: 'active',
        selectionEvent: 'singleclick',
        editEvent: 'none'
    },
    ERROR_HANDLER: {
        defaultErrorMessage: 'AN ERROR OCURRED',
        enabled: true
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
    },
    GRID_ACTIONS: {
        iconCls: 'action-icon',
        menu: [
            {
                text: 'Delete',
                EVENT_HANDLER: () => {
                    alert('hi');
                }
            }
        ]
    }
};

export const editorFunc = (
    value, row, column, columns, columnIndex, stateKey, reactEvent
) => {
    store.dispatch(
        Actions.EditorActions.updateCellValue({
            value: reactEvent.target.value,
            name: column.dataIndex,
            column,
            columns,
            stateKey
        })
    );
};

// column.editor:
// 1. a function
// 2. an array (of strings or {name, value})
// 3. undefined - returns <input text />
export const columns = [
    {
        name: 'Gender',
        dataIndex: 'gender',
        sortable: true,
        width: '10%',
        className: 'additional-class',
        editor: ["Male", "Female"]
    },
    {
        name: 'Name',
        dataIndex: 'Name',
        sortable: true,
        width: '10%',
        className: 'additional-class',
        HANDLE_CLICK: () => { console.log('Header Click'); }
    },
    {
        name: 'Phone Number',
        dataIndex: 'Phone Number',
        sortable: true,
        width: '20%',
        className: 'additional-class',
        editor: (
            /* eslint-disable  react/prop-types */
            { column, columnIndex, row, stateKey, store, value }
            /* eslint-enable  react/prop-types */
        ) => {
            return (
                <input
                    className="react-grid-edit-item"
                    onChange= {
                        editorFunc.bind(
                            null, value, row, column, columns, columnIndex, stateKey
                        )
                    }
                    type="tel"
                    value={ value }
                />
                );
        }
    },
    {
        name: 'Email',
        dataIndex: 'Email',
        width: '25%',
        sortable: true,
        className: 'additional-class',
        defaultSortDirection: 'descend'
    },
    {
        name: 'Address',
        dataIndex: 'Address',
        sortable: true,
        width: '35%',
        className: 'additional-class'
    }
];

export { halfData as data } from './data';
