import React, { PropTypes } from 'react';

import { Cell } from './Cell.jsx';
import { EmptyCell } from './row/EmptyCell.jsx';
import { PlaceHolder } from './row/PlaceHolder.jsx';

import { keyGenerator } from '../../util/keyGenerator';
import { prefix } from '../../util/prefix';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import { CLASS_NAMES } from '../../constants/GridConstants';

export const Row = ({
        columnManager,
        columns,
        dataSource,
        editor,
        editorState,
        emptyDataMessage,
        events,
        pageSize,
        pager,
        plugins,
        reducerKeys,
        selectedRows,
        selectionModel,
        stateKey,
        store
    }) => {

    const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

    const rows = getRowSelection(
        dataSource, pageIndex, pageSize, pager, plugins, stateKey, store
    );

    const rowComponents = getRows(
        columns, columnManager, editor, editorState, reducerKeys,
        rows, events, plugins, selectionModel, selectedRows, stateKey, store
        );

    const rowInsert = rowComponents
        ? rowComponents
        : <PlaceHolder { ...{ emptyDataMessage } } />;

    return (
        <tbody>
            { rowInsert }
        </tbody>
    );
};

Row.propTypes = {
    columnManager: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.object,
    editor: PropTypes.object,
    editorState: PropTypes.object,
    emptyDataMessage: PropTypes.string,
    events: PropTypes.object,
    pageSize: PropTypes.number,
    pager: PropTypes.object,
    plugins: PropTypes.object,
    reducerKeys: PropTypes.object,
    selectedRows: PropTypes.object,
    selectionModel: PropTypes.object,
    stateKey: PropTypes.string,
    store: PropTypes.object.isRequired
};

Row.defaultProps = {
    emptyDataMessage: 'No Data Available'
};

export const addEmptyInsert = (cells, visibleColumns, plugins) => {

    if (visibleColumns.length === 0) {

        if (plugins
            && plugins.GRID_ACTIONS
            && plugins.GRID_ACTIONS.menu
            && plugins.GRID_ACTIONS.menu.length > 0) {
            cells.splice(1, 0, <EmptyCell />);
        }

        else {
            cells.push(<EmptyCell />);
        }
    }

    return cells;
};

export const getCellData = (columns, row, key, index, store) => {

    const valueAtDataIndex = row
        && columns[index]
        && columns[index].dataIndex
        ? row[columns[index].dataIndex]
        : null;

    // if a render has been provided, default to this
    if (row
        && columns[index]
        && columns[index].renderer
        && typeof columns[index].renderer === 'function') {
        return columns[index].renderer({
            column: columns[index],
            value: valueAtDataIndex,
            row,
            key,
            index,
            store
        });
    }

    // if dataIndex has been provided
    // return the obj[dataIndex]
    else if (valueAtDataIndex !== undefined) {
        return valueAtDataIndex;
    }

    // else no data index found
    console.warn('No dataIndex found for this column ', columns);
};

export const addEmptyCells = (rowData, columns) => {

    columns.forEach((col) => {

        if (rowData && !rowData.hasOwnProperty(col.dataIndex)) {
            rowData[col.dataIndex] = '';
        }

    });

    return rowData;
};

export const getRowComponents = (
    columns,
    columnManager,
    editor,
    editorState,
    reducerKeys,
    row,
    events,
    plugins,
    selectionModel,
    selectedRows,
    stateKey,
    store,
    index
) => {

    const id = keyGenerator('row', index);
    const visibleColumns = columns.filter((col) => !col.hidden);

    if (Object.keys(row).length !== columns.length) {
        addEmptyCells(row, columns);
    }

    const cells = Object.keys(row).map((k, i) => {

        const cellProps = {
            index: i,
            rowId: id,
            cellData: getCellData(columns, row, k, i, store),
            columns,
            editor,
            editorState,
            events: events,
            key: keyGenerator(k),
            reducerKeys,
            rowIndex: index,
            rowData: row,
            selectionModel,
            stateKey,
            store
        };

        return <Cell { ...cellProps } />;

    });

    const isSelected = selectedRows ? selectedRows[id] : false;

    const editClass = editorState
        && editorState.row
        && editorState.row.key === id
        ? selectionModel.defaults.editCls
        : '';

    const selectedClass = isSelected ? selectionModel.defaults.activeCls : '';

    const rowProps = {
        key: id,
        className: prefix(CLASS_NAMES.ROW, selectedClass, editClass),
        onClick: (e) => {
            handleRowSingleClickEvent(events, row, id, selectionModel, e);
        },
        onDoubleClick: (e) => {
            handleRowDoubleClickEvent(events, row, id, selectionModel, e);
        }
    };

    columnManager.addActionColumn({
        cells,
        type: 'row',
        id,
        reducerKeys,
        rowData: row,
        rowIndex: index,
        stateKey
    });

    selectionModel.updateCells(cells, id, 'row', reducerKeys, stateKey);

    addEmptyInsert(cells, visibleColumns, plugins);

    return (
        <tr { ...rowProps }>
            { cells }
        </tr>
    );
};

export const handleRowDoubleClickEvent = (
    events, rowData, rowId, selectionModel, reactEvent, id, browserEvent
) => {
    if (selectionModel
            && selectionModel.defaults.selectionEvent
                === selectionModel.eventTypes.doubleclick
            && selectionModel.defaults.editEvent
                !== selectionModel.eventTypes.doubleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId
        });
    }

    if (events.HANDLE_ROW_DOUBLE_CLICK) {
        events.HANDLE_ROW_DOUBLE_CLICK.call(
            this, rowData, rowId, reactEvent, id, browserEvent
        );
    }
};

export const handleRowSingleClickEvent = (
    events, rowData, rowId, selectionModel, reactEvent, id, browserEvent
) => {

    if (selectionModel
            && selectionModel.defaults.selectionEvent
                === selectionModel.eventTypes.singleclick
            && selectionModel.defaults.editEvent
                !== selectionModel.eventTypes.singleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId
        });
    }

    if (events.HANDLE_ROW_CLICK) {
        events.HANDLE_ROW_CLICK.call(
            this, rowData, rowId, reactEvent, id, browserEvent
        );
    }
};

export const getRowSelection = (
    dataSource, pageIndex, pageSize, pager, plugins
) => {
    if (!dataSource) {
        return false;
    }

    if (!plugins.PAGER
        || !plugins.PAGER.enabled
        || plugins.PAGER.pagingType === 'remote') {
        return dataSource.data;
    }

    return getCurrentRecords(dataSource, pageIndex, pageSize);
};

export const getRows = (
    columns,
    columnManager,
    editor,
    editorState,
    reducerKeys,
    rows,
    events,
    plugins,
    selectionModel,
    selectedRows,
    stateKey,
    store
) => {

    return Array.isArray(rows)
            ? rows.map((row,
             i) => getRowComponents(
                columns,
                columnManager,
                editor,
                editorState,
                reducerKeys,
                row,
                events,
                plugins,
                selectionModel,
                selectedRows,
                stateKey,
                store,
                i
            ))
            : null;
};