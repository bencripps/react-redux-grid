import PropTypes from 'prop-types';
import React from 'react';

import { DragHandle } from './column/DragHandle';
import { SortHandle } from './column/SortHandle';
import { Text } from './column/Text';

import { keyGenerator } from './../../../util/keyGenerator';
import { prefix } from './../../../util/prefix';

import {
    gridConfig,
    SORT_DIRECTIONS,
    SORT_METHODS
} from './../../../constants/GridConstants';

import { reorderColumn } from './../../../actions/core/ColumnManager';
import { setSortDirection } from './../../../actions/GridActions';

const isChrome = navigator && /Chrome/.test(navigator.userAgent)
    && /Google Inc/.test(navigator.vendor);

export const Column = ({
    actualIndex,
    scope,
    col,
    columns,
    columnManager,
    dataSource,
    dragAndDropManager,
    filterFields,
    pageSize,
    pager,
    store,
    stateKey,
    index,
    stateful
}) => {

    if (col.hidden) {
        return false;
    }
    const { CLASS_NAMES } = gridConfig();

    const isResizable = isColumnResizable(col, columnManager);

    const sortable = isSortable(col, columnManager);

    const visibleColumns = columns.filter(c => !c.hidden);

    const sortedColumn = columns.find(c => c.sortDirection);

    const shouldShowCaret = sortedColumn
        ? sortedColumn.dataIndex === col.dataIndex
        : col.defaultSortDirection;

    const direction = col.sortDirection
        || col.defaultSortDirection
        || SORT_DIRECTIONS.ASCEND;

    const sortHandleCls = shouldShowCaret
        ? prefix(CLASS_NAMES.SORT_HANDLE_VISIBLE) : '';

    const key = keyGenerator(col.name, 'grid-column');

    const nextColumnKey = visibleColumns && visibleColumns[index + 1]
        ? keyGenerator(visibleColumns[index + 1].name, 'grid-column') : null;

    const handleDrag = scope.handleDrag.bind(
        scope,
        scope,
        columns,
        key,
        columnManager,
        store,
        nextColumnKey,
        stateKey,
        stateful
    );

    const sortHandle = sortable
        ? <SortHandle { ...{
            col,
            columns,
            columnManager,
            dataSource,
            direction,
            pager,
            sortHandleCls,
            store }
        } />
        : null;

    const dragHandle = isResizable
        ? <DragHandle { ...{ col, dragAndDropManager, handleDrag } } /> : null;

    let headerClass = col.className
        ? `${col.className} ${isResizable ? prefix('resizable') : ''}`
        : `${isResizable ? prefix('resizable') : ''}`;

    if (sortHandleCls) {
        headerClass = `${headerClass} ${sortHandleCls}`;
    }

    if (col.sortable) {
        headerClass = `${headerClass} ${prefix('is-sortable')}`;
    }

    if (index === 0) {
        headerClass = `${headerClass} ${prefix('is-first-column')}`;
    }

    const clickArgs = {
        columns,
        col,
        columnManager,
        dataSource,
        direction,
        filterFields,
        pageSize,
        pager,
        stateKey,
        store
    };

    const headerProps = {
        className: headerClass,
        onClick: handleColumnClick.bind(scope, clickArgs),
        onDrop: handleDrop.bind(
            scope, actualIndex, columns, stateful, stateKey, store
        ),
        onDragOver: (reactEvent) => {
            reactEvent.preventDefault();
        },
        key,
        style: {
            width: getWidth(
                col,
                key,
                columns,
                columnManager.config.defaultColumnWidth,
                index
            )
        }
    };

    if (!isChrome) {
        headerProps.onDragOver = (reactEvent) => {
            // due to a bug in firefox, we need to set a global to
            // preserve the x coords
            // http://stackoverflow.com/questions/11656061/
            // event-clientx-showing-as-0-in-firefox-for-dragend-event
            window.reactGridXcoord = reactEvent.clientX;
            reactEvent.preventDefault();
        };
    }

    const innerHTML = (
        <Text {
            ...{
                actualIndex,
                col,
                index,
                columnManager,
                dragAndDropManager,
                sortHandle
            }
        } />
    );

    return (
        <th { ...headerProps } >
            { innerHTML }
            { dragHandle }
        </th>
    );
};

Column.propTypes = {
    actualIndex: PropTypes.number,
    col: PropTypes.object,
    columnManager: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.object,
    dragAndDropManager: PropTypes.object,
    filterFields: PropTypes.object,
    index: PropTypes.number,
    pageSize: PropTypes.number,
    pager: PropTypes.object,
    scope: PropTypes.object,
    stateKey: PropTypes.string,
    stateful: PropTypes.bool,
    store: PropTypes.object
};

export const handleDrop = (
    droppedIndex, columns, stateful, stateKey, store, reactEvent
) => {

    reactEvent.preventDefault();
    try {
        const colData = reactEvent
            && reactEvent.dataTransfer.getData
            ? JSON.parse(reactEvent.dataTransfer.getData('Text'))
            : null;

        if (colData) {
            store.dispatch(
                reorderColumn({
                    draggedIndex: colData.index,
                    droppedIndex: droppedIndex,
                    columns,
                    stateKey,
                    stateful
                })
            );
        }

    }

    catch (e) {
        /* eslint-disable no-console */
        console.warn('Invalid drop');
        /* eslint-enable no-console */
    }

};

export const handleSort = (
    columns,
    col,
    columnManager,
    dataSource,
    direction,
    filterFields,
    pageSize,
    pager,
    stateKey,
    store
) => {

    const newDirection = direction === SORT_DIRECTIONS.ASCEND
        ? SORT_DIRECTIONS.DESCEND
        : SORT_DIRECTIONS.ASCEND;

    store.dispatch(
        setSortDirection({
            columns,
            id: col.id,
            sortDirection: newDirection,
            stateKey
        })
    );

    if (columnManager.config.sortable.method.toUpperCase()
        === SORT_METHODS.LOCAL) {
        columnManager.doSort({
            method: SORT_METHODS.LOCAL,
            column: col,
            direction: newDirection,
            dataSource,
            filterFields,
            pageSize,
            pagerState: null,
            stateKey
        });
    }

    else if (columnManager.config.sortable.method.toUpperCase()
            === SORT_METHODS.REMOTE) {
        columnManager.doSort({
            method: SORT_METHODS.REMOTE,
            column: col,
            direction: newDirection,
            dataSource,
            filterFields,
            pageSize,
            pagerState: pager,
            stateKey
        });
    }

    else {
        /* eslint-disable no-console */
        console.warn('Sort method not defined!');
        /* eslint-enable no-console */
    }
};

export const handleColumnClick = ({
    columns,
    col,
    columnManager,
    dataSource,
    direction,
    filterFields,
    pageSize,
    pager,
    stateKey,
    store
}) => {

    if (col.sortable
        || columnManager
        && columnManager.config
        && columnManager.config.sortable
        && columnManager.config.sortable.enabled
        && col.sortable !== false) {
        handleSort(
            columns,
            col,
            columnManager,
            dataSource,
            direction,
            filterFields,
            pageSize,
            pager,
            stateKey,
            store
        );
    }

    if (typeof col.HANDLE_CLICK === 'function') {
        col.HANDLE_CLICK({
            columns,
            column: col,
            sortDirection: direction
        }, null);
    }
};

export const isSortable = (col, columnManager) => {

    if (col.sortable !== undefined) {
        return col.sortable;
    }

    else if (columnManager.config.sortable.enabled !== undefined) {
        return columnManager.config.sortable.enabled;
    }

    return columnManager.config.defaultSortable;

};

export const getWidth = (col, key, columns, defaultColumnWidth) => {

    const visibleColumns = columns.filter((_col) => !_col.hidden);
    const lastColumn = visibleColumns[visibleColumns.length - 1];
    const isLastColumn = lastColumn && lastColumn.name === col.name;
    const totalWidth = columns.reduce((a, _col) => {
        if (_col.hidden) {
            return a + 0;
        }
        return a + parseFloat(_col.width || defaultColumnWidth);
    }, 0);

    let width = col.width || defaultColumnWidth;

    if (isLastColumn
            && totalWidth !== 0
            && totalWidth < 100) {
        width = `${100 - (totalWidth - parseFloat(width))}%`;
    }

    return width;

};

export const isColumnResizable = (col, columnManager) => {

    if (col.resizable !== undefined) {
        return col.resizable;
    }

    else if (columnManager.config.resizable !== undefined) {
        return columnManager.config.resizable;
    }

    return columnManager.config.defaultResizable;
};
