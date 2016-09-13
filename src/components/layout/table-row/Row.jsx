import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import { Cell } from './row/Cell';
import { EmptyCell } from './row/EmptyCell';

import { keyGenerator } from '../../../util/keyGenerator';
import { shouldRowUpdate } from '../../../util/shouldComponentUpdate';
import { prefix } from '../../../util/prefix';
import { getData, getRowKey } from '../../../util/getData';
import { CLASS_NAMES } from '../../../constants/GridConstants';
import { DragSource, DropTarget } from 'react-dnd';

const { arrayOf, bool, func, object, string, oneOf, number } = PropTypes;

export class Row extends Component {

    render() {

        const {
            columnManager,
            columns,
            connectDragSource,
            connectDropTarget,
            editor,
            editorState,
            events,
            gridType,
            index,
            isDragging,
            menuState,
            plugins,
            readFunc,
            reducerKeys,
            row,
            selectedRows,
            selectionModel,
            showTreeRootNode,
            stateKey,
            store,
            treeData
        } = this.props;

        const id = keyGenerator('row', index);
        const visibleColumns = columns.filter((col) => !col.hidden);
        const cellValues = getCellValues(columns, row);

        if (Object.keys(row).length !== columns.length) {
            addEmptyCells(row, columns);
        }

        const cells = Object.keys(cellValues).map((k, i) => {

            const cellProps = {
                cellData: getCellData(columns, row, k, i, store),
                columns,
                editor,
                editorState,
                events: events,
                gridType,
                index: i,
                readFunc,
                reducerKeys,
                rowData: cellValues,
                rowId: id,
                rowIndex: index,
                selectionModel,
                showTreeRootNode,
                stateKey,
                store,
                treeData: {
                    ...treeData,
                    expandable: columns[i].expandable
                }
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
            },
            style: {
                opacity: isDragging ? 0.25 : 1
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

        return connectDragSource(connectDropTarget(
            <tr { ...rowProps }>
                { cells }
            </tr>
        ));

    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = shouldRowUpdate.bind(this);
    }

    static propTypes = {
        columnManager: object.isRequired,
        columns: arrayOf(object).isRequired,
        connectDragSource: func.isRequired,
        connectDropTarget: func.isRequired,
        data: arrayOf(object),
        dataSource: object,
        editor: object,
        editorState: object,
        emptyDataMessage: string,
        events: object,
        gridType: oneOf([
            'tree', 'grid'
        ]),
        index: number,
        isDragging: bool,
        menuState: object,
        pageSize: number,
        pager: object,
        plugins: object,
        readFunc: func,
        reducerKeys: object,
        row: object,
        selectedRows: object,
        selectionModel: object,
        showTreeRootNode: bool,
        stateKey: string,
        store: object.isRequired,
        treeData: object
    };

    static defaultProps = {
        emptyDataMessage: 'No Data Available',
        treeData: {}
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

const rowSource = {
    beginDrag({ treeData }) {
        return {
            id: treeData.id,
            index: treeData.index,
            parentId: treeData.parentId
        };
    }
};

const rowTarget = {
    hover(props, monitor, component) {
        const hoverIndex = props.treeData.index;
        const hoverParentId = props.treeData.parentId;

        const { id, index, parentId } = monitor.getItem();

        if (index === -1) {
            return;
        }

        if (hoverIndex === index) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        //
        //const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // console.log('hoverClientX', hoverClientX);

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (index < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (index > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        if (props.isValidDrop(id, hoverParentId)) {
            // Time to actually perform the action
            props.moveRow(
                { id, index, parentId },
                { index: hoverIndex, parentId: hoverParentId }
            );

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
            monitor.getItem().parentId = hoverParentId;
        }

    }
};

export default DropTarget('ROW', rowTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(
    DragSource('ROW', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))(Row)
);
