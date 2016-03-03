import React, { PropTypes } from 'react';

import { DragHandle } from './column/DragHandle.jsx';
import { SortHandle } from './column/SortHandle.jsx';
import { Text } from './column/Text.jsx';

import { keyGenerator } from './../../../util/keyGenerator';
import { prefix } from './../../../util/prefix';

import { reorderColumn } from '../../../actions/core/ColumnManager';

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

    const key = keyGenerator(col.name, 'grid-column');

    const nextColumnKey = visibleColumns && visibleColumns[index + 1]
        ? keyGenerator(visibleColumns[index + 1].name, 'grid-column') : null;

    const sortHandle = sortable
        ? <SortHandle { ...{ col, columns, columnManager, dataSource, pager, store } } />
        : null;

    const dragHandle = isResizable
        ? <DragHandle { ...{ col, dragAndDropManager } } /> : null;

    const headerProps = {
        className: `${col.className} ${isResizable ? prefix('resizable') : ''}`,
        onClick: handleColumnClick.bind(scope, col),
        onDrag: scope.handleDrag.bind(scope, scope, columns, key, columnManager, store, nextColumnKey),
        onDrop: handleDrop.bind(scope, index, columns, store),
        key,
        style: {
            width: getWidth(col, key, columns, columnManager.config.defaultColumnWidth, index)
        }
    };

    const innerHTML = <Text { ...{ col, index, columnManager, dragAndDropManager } } />;

    return (
        <th { ...headerProps } >
            { innerHTML }
            { sortHandle }
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

export const handleColumnClick = (col) => {
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
        return a + parseFloat(_col.width || 0);
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