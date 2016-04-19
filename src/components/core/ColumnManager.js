import React from 'react';
import ActionColumn from '../plugins/gridactions/ActionColumn.jsx';
import { SORT_METHODS, DEFAULT_PAGE_SIZE } from '../../constants/GridConstants';
import { keyFromObject } from '../../util/keyGenerator';
import { camelize } from '../../util/camelize';
import { doLocalSort, doRemoteSort } from '../../actions/GridActions';
import sorter from '../../util/sorter';

export default class ColumnManager {

    init({plugins, store, events, selModel, editor, columns, reducerKeys, dataSource}) {

        const defaults = {
            defaultColumnWidth: `${100 / columns.length}%`,
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

    doSort(method, column, direction, dataSource, pagerState) {

        const propName = camelize(column.name);

        const sortParams = {
            sort: {
                property: propName,
                direction: direction
            }
        };

        const pageIndex = pagerState && pagerState.pageIndex ? pagerState.pageIndex : 0;

        const pageSize = pagerState && pagerState.pageSize ? pagerState.pageSize : DEFAULT_PAGE_SIZE;

        if (method === SORT_METHODS.LOCAL) {
            this.store.dispatch(
                doLocalSort(
                    this.sorter.sortBy(column.name, direction, dataSource)));
        }

        else {
            this.store.dispatch(
                doRemoteSort(this.config.sortable.sortingSource, pageIndex, pageSize, sortParams
            ));
        }
    }

    addActionColumn(cells, type, id, reducerKeys, rowData, rowIndex) {

        const { GRID_ACTIONS } = this.plugins;
        const cellsCopy = cells;
        const actionProps = {
            actions: GRID_ACTIONS,
            store: this.store,
            type,
            columns: this.columns,
            rowId: id,
            rowData,
            rowIndex,
            editor: this.editor,
            reducerKeys,
            selModel: this.selModel,
            headerActionItemBuilder: this.config.headerActionItemBuilder,
            key: keyFromObject(cells, ['row', 'actionhandler'])
        };

        if (GRID_ACTIONS) {
            cells.push(<ActionColumn { ...actionProps } />);
        }

        return cellsCopy;
    }
}