import React, { PropTypes } from 'react';

import { DragHandle } from './column/DragHandle';
import { SortHandle } from './column/SortHandle';
import { Text } from './column/Text';

import { keyGenerator } from './../../../util/keyGenerator';
import { prefix } from './../../../util/prefix';

import {
    CLASS_NAMES,
    SORT_DIRECTIONS,
    SORT_METHODS
} from './../../../constants/GridConstants';

import { reorderColumn } from './../../../actions/core/ColumnManager';
import { setSortDirection } from './../../../actions/GridActions';

const isChrome = /Chrome/.test(navigator.userAgent)
    && /Google Inc/.test(navigator.vendor);

export const Column = ({
    scope,
    col,
    columns,
    columnManager,
    dataSource,
    dragAndDropManager,
    pager,
    store,
    stateKey,
    index,
    stateful
}) => {

    if (col.hidden) {
        return false;
    }

    const isResizable = isColumnResizable(col, columnManager);

    const sortable = isSortable(col, columnManager);

    const visibleColumns = columns.filter((_col) => !_col.hidden);

    const direction = col.sortDirection
        || col.defaultSortDirection
        || SORT_DIRECTIONS.ASCEND;

    const sortHandleCls = col.sortDirection
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

    const clickArgs = {
        columns,
        col,
        columnManager,
        dataSource,
        direction,
        pager,
        stateKey,
        store
    };

    const headerProps = {
        className: headerClass,
        onClick: handleColumnClick.bind(scope, clickArgs),
        onDrop: handleDrop.bind(
            scope, index, columns, stateful, stateKey, store
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
    col: PropTypes.object,
    columnManager: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.object,
    dragAndDropManager: PropTypes.object,
    index: PropTypes.number,
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
    columns, col, columnManager, dataSource, direction, pager, stateKey, store
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

    if (columnManager.events.HANDLE_SORT_CHANGED) {
        columnManager.events.HANDLE_SORT_CHANGED(col, newDirection);
    }

    if (columnManager.config.sortable.method.toUpperCase()
        === SORT_METHODS.LOCAL) {
        columnManager.doSort({
            method: SORT_METHODS.LOCAL,
            column: col,
            direction: newDirection,
            dataSource,
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
            pagerState: pager,
            stateKey
        });
    }

    else {
        console.warn('Sort method not defined!');
    }
};

export const handleColumnClick = ({
    columns,
    col,
    columnManager,
    dataSource,
    direction,
    pager,
    stateKey,
    store
}) => {

    if (col.sortable) {
        handleSort(
            columns,
            col,
            columnManager,
            dataSource,
            direction,
            pager,
            stateKey,
            store
        );
    }

    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(this, arguments);
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
