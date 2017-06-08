import React from 'react';
import ActionColumn from '../plugins/gridactions/ActionColumn';
import { SORT_METHODS, DEFAULT_PAGE_SIZE } from '../../constants/GridConstants';
import { keyFromObject } from '../../util/keyGenerator';
import { nameFromDataIndex } from '../../util/getData';
import { fireEvent } from '../../util/fire';
import { doLocalSort, doRemoteSort } from '../../actions/GridActions';
import sorter from '../../util/sorter';

export default class ColumnManager {

    init({
        plugins, store, events, selModel, editor, columns, dataSource
    }) {

        const visibleColumns = columns.filter(col => !col.hidden);

        const defaults = {
            defaultColumnWidth: `${100 / visibleColumns.length}%`,
            dataSource: dataSource,
            minColumnWidth: 10,
            moveable: false,
            resizable: false,
            headerActionItemBuilder: null,
            sortable: {
                enabled: true,
                method: SORT_METHODS.LOCAL,
                sortingSource: plugins
                    && plugins.COLUMN_MANAGER
                    && plugins.COLUMN_MANAGER.sortable
                    && plugins.COLUMN_MANAGER.sortable.sortingSource
                    ? plugins.COLUMN_MANAGER.sortable.sortingSource
                    : ''
            },

            /**
                @private properties used by components
                    if properties are not available
                    i wouldn't remove these, but the
                    values can be flipped
            **/
            defaultResizable: false,
            defaultSortable: true
        };

        const config = plugins && plugins.COLUMN_MANAGER
            ? Object.assign(defaults, plugins.COLUMN_MANAGER) : defaults;

        this.plugins = plugins;
        this.store = store;
        this.sorter = sorter;
        this.events = events;
        this.selModel = selModel;
        this.editor = editor;
        this.columns = columns;
        this.config = config;
    }

    doSort({
        method,
        column,
        direction,
        dataSource,
        filterFields,
        pageSize,
        pagerState,
        stateKey
    }) {

        const propName = nameFromDataIndex(column);

        const sortParams = {
            sort: {
                property: propName,
                direction: direction
            }
        };

        const pageIndex = pagerState
            && pagerState.get('pageIndex')
            ? pagerState.get('pageIndex')
            : 0;

        pageSize = pageSize || DEFAULT_PAGE_SIZE;
        // const pageSize = pagerState
        //     && pagerState.get('pageSize')
        //     ? pagerState.get('pageSize')
        //     : DEFAULT_PAGE_SIZE;

        const beforeSortEvent = fireEvent(
            'HANDLE_BEFORE_SORT',
            this.events,
            {
                property: propName,
                direction,
                store: this.store,
                column
            },
            null
        );

        if (beforeSortEvent === false) {
            return;
        }

        if (method === SORT_METHODS.LOCAL) {
            const data = typeof column.sortFn === 'function'
                ? dataSource.data.sort(column.sortFn.bind(null, direction))
                : this.sorter.sortBy(column.dataIndex, direction, dataSource);

            this.store.dispatch(
                doLocalSort({
                    data,
                    stateKey
                })
            );
        }

        else {
            this.store.dispatch(
                doRemoteSort({
                    dataSource: this.config.sortable.sortingSource,
                    filterFields,
                    pageIndex,
                    pageSize,
                    sortParams,
                    stateKey
                })
            );
        }
    }

    addActionColumn({
        cells,
        columns,
        type,
        id,
        reducerKeys,
        rowData,
        rowIndex,
        menuState,
        stateKey,
        stateful
    }) {

        const { GRID_ACTIONS } = this.plugins;
        const cellsCopy = cells;
        const actionProps = {
            actions: GRID_ACTIONS,
            store: this.store,
            type,
            columns: columns || this.columns,
            rowId: id,
            rowData,
            rowIndex,
            editor: this.editor,
            reducerKeys,
            selModel: this.selModel,
            stateful,
            stateKey,
            menuState,
            gridState: columns,
            headerActionItemBuilder: this.config.headerActionItemBuilder,
            key: keyFromObject(cells, ['row', 'actionhandler'])
        };

        if (GRID_ACTIONS) {
            cells.push(<ActionColumn { ...actionProps } />);
        }

        return cellsCopy;
    }
}
