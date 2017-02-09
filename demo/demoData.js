import React from 'react';

import store from './../src/store/store';
import { Actions } from './../src/actions';

export const pageSize = 20;

export const stateKey = 'grid-stateKey';

export const height = '';

export const stateful = true;

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
    HANDLE_AFTER_INLINE_EDITOR_SAVE: () => {
        console.log('On After Save Inline Editor Event');
    },
    HANDLE_BEFORE_BULKACTION_SHOW: () => {
        console.log('On Before Bulk Action Show');
    },
    HANDLE_AFTER_BULKACTION_SHOW: () => {
        console.log('On After Bulk Action Show');
    },
    HANDLE_BEFORE_SORT: () => {
        console.log('before sort event');
    },
    HANDLE_AFTER_SELECT_ALL: () => {
        console.log('Handle after select all');
    },
    HANDLE_AFTER_DESELECT_ALL: () => {
        console.log('Handle after deselect all');
    },
    HANDLE_AFTER_ROW_DROP: ({ treeData, row }) => {
        console.log('After drag and drop of row event');
    },
    HANDLE_EDITOR_FOCUS: (a) => {
        console.log(a)
        console.log('Handle editor focus');
    },
    HANDLE_EDITOR_BLUR: () => {
        console.log('Handle editor blur');
    }
};

export const examplePromiseDataSource = function getData({
    pageIndex, pageSize
}) {
    return new Promise((resolve) => {
        const request = new XMLHttpRequest();

        const config = {
            method: 'GET',
            route: 'http://react-redux-grid.herokuapp.com/getfakeData'
        };

        if (pageIndex) {
            config.route = `${config.route}?pageIndex=${pageIndex}&pageSize=${pageSize}`; // eslint-disable-line max-len
        }

        request.open(config.method, config.route, true);

        request.addEventListener(
            'load', (res) => {
                const response = JSON.parse(res.target.responseText);

                // if you have more data than is being shown
                // ensure you return a total, so the pager knows
                // what paging actions are possible

                resolve({
                    data: response.data,
                    total: response.total
                });
            }
        );

        request.send(config.data || null);
    });
};

export const dataSource = 'http://react-redux-grid.herokuapp.com/getfakeData';
export const treeDataSource = (
    'http://react-redux-grid.herokuapp.com/gettreeData'
);

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
        pagingType: 'remote'
    },
    LOADER: {
        enabled: true
    },
    SELECTION_MODEL: {
        mode: 'checkbox-multi',
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
        enabled: false,
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
                key: 'delete',
                EVENT_HANDLER: ({ metaData }) => {
                    const rowIndex = metaData.rowIndex;

                    store.dispatch(
                        Actions.EditorActions.removeRow({
                            stateKey,
                            rowIndex
                        })
                    );
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
            stateKey,
            rowId: row.key
        })
    );
};

export const columns = [
    {
        name: 'Name',
        dataIndex: 'Name',
        sortable: true,

        width: '60%',
        className: 'additional-class',
        expandable: true,
        sortFn: (direction, previousRow, currentRow) => {
            // do custom sort
        },
        HANDLE_CLICK: () => { console.log('Header Click'); }
    },
    {
        name: 'Phone Number',
        dataIndex: 'Phone Number',
        editable: ({ isRowSelected }) => {
            return isRowSelected;
        },
        sortable: true,
        className: 'additional-class',
        editor: (
            /* eslint-disable  react/prop-types */
            { column, columnIndex, row, stateKey, store, value }
            /* eslint-enable  react/prop-types */
        ) => {

            return (
                <input
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
        sortable: true,
        className: 'additional-class',
        defaultSortDirection: 'descend',
        /* eslint-disable react/prop-types */
        renderer: ({ value }) => {
            return <span>'Email:' { value } </span>;
        }
    },
    {
        name: 'Address',
        dataIndex: 'Address',
        sortable: true,
        className: 'additional-class'
    }
];

export { allData as data, treeData } from './data';
