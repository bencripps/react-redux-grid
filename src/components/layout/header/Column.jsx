import React, { PropTypes } from 'react';

import { DragHandle } from './column/DragHandle.jsx';
import { SortHandle } from './column/SortHandle.jsx';
import { Text } from './column/Text.jsx';

import { keyGenerator } from './../../../util/keyGenerator';
import { prefix } from './../../../util/prefix';

import { 
    CLASS_NAMES,
    SORT_DIRECTIONS,
    SORT_METHODS
} from './../../../constants/GridConstants';

import { reorderColumn } from './../../../actions/core/ColumnManager';
import { setSortDirection } from './../../../actions/GridActions';

export const Column = ({
    scope, col, columns, columnManager, dataSource,
    dragAndDropManager, pager, store, index
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
        ? CLASS_NAMES.SORT_HANDLE_VISIBLE : '';

    const key = keyGenerator(col.name, 'grid-column');

    const nextColumnKey = visibleColumns && visibleColumns[index + 1]
        ? keyGenerator(visibleColumns[index + 1].name, 'grid-column') : null;

    const handleDrag = scope.handleDrag.bind(scope, scope, columns, key, columnManager, store, nextColumnKey);

    const sortHandle = sortable
        ? <SortHandle { ...{ col, columns, columnManager, dataSource, direction, pager, sortHandleCls, store } } />
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
        headerClass = `${headerClass} is-sortable`;
    }

    const clickArgs = {
        columns,
        col,
        columnManager,
        dataSource,
        direction,
        pager,
        store
    };

    const headerProps = {
        className: headerClass,
        onClick: handleColumnClick.bind(scope, clickArgs),
        onDragOver: (reactEvent) => {
            reactEvent.preventDefault();
        },
        droppable: true,
        onDrop: handleDrop.bind(scope, index, columns, store),
        key,
        style: {
            width: getWidth(col, key, columns, columnManager.config.defaultColumnWidth, index)
        }
    };

    const innerHTML = <Text { ...{ col, index, columnManager, dragAndDropManager, sortHandle } } />;

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
    store: PropTypes.object
};

export const handleDrop = (droppedIndex, columns, store, reactEvent) => {
    reactEvent.preventDefault();
    try {
        const colData = reactEvent
            && reactEvent.dataTransfer.getData
            ? JSON.parse(reactEvent.dataTransfer.getData('Text'))
            : null;

        if (colData) {
            store.dispatch(reorderColumn(colData.index, droppedIndex, columns));
        }

    }

    catch(e) {
        console.warn('Invalid drop');
    }

};

export const handleSort = (columns, col, columnManager, dataSource, direction, pager, store) => {

    const newDirection = direction === SORT_DIRECTIONS.ASCEND
        ? SORT_DIRECTIONS.DESCEND
        : SORT_DIRECTIONS.ASCEND;

    store.dispatch(setSortDirection(columns, col.id, newDirection));

    if (columnManager.config.sortable.method.toUpperCase() === SORT_METHODS.LOCAL) {
        columnManager.doSort(SORT_METHODS.LOCAL, col, newDirection, dataSource);
    }

    else if (columnManager.config.sortable.method.toUpperCase() === SORT_METHODS.REMOTE) {
        columnManager.doSort(SORT_METHODS.REMOTE, col, newDirection, dataSource, pager);
    }

    else {
        console.warn('Sort method not defined!');
    }
};

export const handleColumnClick = (
    { columns, col, columnManager, dataSource, direction, pager, store }
) => {
    if (col.sortable) {
        handleSort(columns, col, columnManager, dataSource, direction, pager, store);
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

    else {
        return columnManager.config.defaultSortable;
    }
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

    else {
        return columnManager.config.defaultResizable;
    }
};