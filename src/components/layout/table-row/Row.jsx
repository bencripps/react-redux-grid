import React, { Component, PropTypes } from 'react';

import { Cell } from './row/Cell';
import { EmptyCell } from './row/EmptyCell';

import { keyGenerator } from '../../../util/keyGenerator';
import { shouldRowUpdate } from '../../../util/shouldComponentUpdate';
import { prefix } from '../../../util/prefix';
import { getData, getRowKey } from '../../../util/getData';
import { CLASS_NAMES } from '../../../constants/GridConstants';

export class Row extends Component {

    render() {

        const {
            columns,
            columnManager,
            editor,
            editorState,
            menuState,
            reducerKeys,
            row,
            events,
            plugins,
            selectionModel,
            selectedRows,
            stateKey,
            store,
            index
        } = this.props;

        const id = keyGenerator('row', index);
        const visibleColumns = columns.filter((col) => !col.hidden);
        const cellValues = getCellValues(columns, row);

        if (Object.keys(row).length !== columns.length) {
            addEmptyCells(row, columns);
        }

        const cells = Object.keys(cellValues).map((k, i) => {

            const cellProps = {
                index: i,
                rowId: id,
                cellData: getCellData(columns, row, k, i, store),
                columns,
                editor,
                editorState,
                events: events,
                reducerKeys,
                rowIndex: index,
                rowData: cellValues,
                selectionModel,
                stateKey,
                store
            };

            const key = getRowKey(columns, row, i, columns[i].dataIndex);

            return (
                <Cell
                    key={ key }
                    { ...cellProps }
                />);

        });

        const isSelected = selectedRows ? selectedRows[id] : false;

        const editClass = editorState
            && editorState.row
            && editorState.row.key === id
            ? selectionModel.defaults.editCls
            : '';

        const selectedClass = isSelected
            ? selectionModel.defaults.activeCls
            : '';

        const rowProps = {
            className: prefix(CLASS_NAMES.ROW, selectedClass, editClass),
            onClick: (e) => {
                handleRowSingleClickEvent(
                    events, row, id, selectionModel, index, e
                );
            },
            onDoubleClick: (e) => {
                handleRowDoubleClickEvent(
                    events, row, id, selectionModel, index, e
                );
            }
        };

        columnManager.addActionColumn({
            cells,
            columns,
            type: 'row',
            id,
            reducerKeys,
            rowData: row,
            rowIndex: index,
            stateKey,
            menuState
        });

        selectionModel.updateCells(cells, id, 'row', reducerKeys, stateKey);

        addEmptyInsert(cells, visibleColumns, plugins);

        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
        );

    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldRowUpdate.bind(this);
    }

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        data: PropTypes.arrayOf(PropTypes.object),
        dataSource: PropTypes.object,
        editor: PropTypes.object,
        editorState: PropTypes.object,
        emptyDataMessage: PropTypes.string,
        events: PropTypes.object,
        index: PropTypes.number,
        menuState: PropTypes.object,
        pageSize: PropTypes.number,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        reducerKeys: PropTypes.object,
        row: PropTypes.object,
        selectedRows: PropTypes.object,
        selectionModel: PropTypes.object,
        stateKey: PropTypes.string,
        store: PropTypes.object.isRequired
    };

    static defaultProps = {
        emptyDataMessage: 'No Data Available'
    };

}

export const getCellValues = (columns, row) => {

    const result = {};
    const dataIndexes = columns.map(col => col.dataIndex);

    dataIndexes.forEach(idx => {
        result[idx] = row[idx];
    });

    return result;
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

    const valueAtDataIndex = getData(row, columns, index);

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
};

export const addEmptyCells = (rowData, columns) => {

    columns.forEach((col) => {

        // const data = nameFromDataIndex(col);
        // come back to this
        // how we retrieve and store data, especially editable
        // may need to be updated based on array dataIndex

        if (rowData && !rowData.hasOwnProperty(col.dataIndex)) {
            rowData[col.dataIndex] = '';
        }

    });

    return rowData;
};

export const handleRowDoubleClickEvent = (
    events, rowData, rowId, selectionModel, index, reactEvent, id, browserEvent
) => {
    if (selectionModel
            && selectionModel.defaults.selectionEvent
                === selectionModel.eventTypes.doubleclick
            && selectionModel.defaults.editEvent
                !== selectionModel.eventTypes.doubleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index
        });
    }

    if (events.HANDLE_ROW_DOUBLE_CLICK) {
        events.HANDLE_ROW_DOUBLE_CLICK.call(
            this, rowData, rowId, reactEvent, id, browserEvent
        );
    }
};

export const getSelectedText = () => {
    let text = '';
    if (typeof window.getSelection !== 'undefined') {
        text = window.getSelection().toString();
    }
    else if (typeof document.selection !== 'undefined'
        && document.selection.type === 'Text') {
        text = document.selection.createRange().text;
    }
    return text;
};

export const handleRowSingleClickEvent = (
    events, rowData, rowId, selectionModel, index, reactEvent, id, browserEvent
) => {

    if (getSelectedText()) {
        return false;
    }

    if (selectionModel
            && selectionModel.defaults.selectionEvent
                === selectionModel.eventTypes.singleclick
            && selectionModel.defaults.editEvent
                !== selectionModel.eventTypes.singleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index
        });
    }

    if (events.HANDLE_ROW_CLICK) {
        events.HANDLE_ROW_CLICK.call(
            this, rowData, rowId, reactEvent, id, browserEvent
        );
    }
};

export default Row;
