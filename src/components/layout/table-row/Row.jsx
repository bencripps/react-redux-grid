import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import { Cell } from './row/Cell';
import { EmptyCell } from './row/EmptyCell';
import RowContainer from './row/RowContainer';

import { prefix } from '../../../util/prefix';
import { getData, getRowKey } from '../../../util/getData';
import { CLASS_NAMES } from '../../../constants/GridConstants';

const { arrayOf, bool, func, object, string, oneOf, number } = PropTypes;

const DRAG_INCREMENT = 15;

export class Row extends Component {

    render() {

        const {
            columnManager,
            columns,
            connectDragSource,
            connectDropTarget,
            dragAndDrop,
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

        const id = row._key;

        const visibleColumns = columns.filter((col) => !col.hidden);
        const cellValues = getCellValues(columns, row);

        if (Object.keys(row).length !== columns.length) {
            addEmptyCells(row, columns);
        }

        const cells = Object.keys(cellValues).map((k, i) => {

            const cellProps = {
                cellData: getCellData(columns, row, k, i, store),
                columns,
                dragAndDrop,
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

            const key = getRowKey(columns, row, columns[i].dataIndex);

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

        const dragClass = isDragging
            ? CLASS_NAMES.ROW_IS_DRAGGING
            : '';

        let extraStyles = {}

        if ( plugins.ROW_MANAGER && plugins.ROW_MANAGER.styleRenderer ) {
            extraStyles = plugins.ROW_MANAGER.styleRenderer( row )
        }

        const rowProps = {
            className: prefix(
                CLASS_NAMES.ROW,
                selectedClass,
                editClass,
                dragClass
            ),
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
            style: extraStyles
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

        const rowEl = (
            <tr { ...rowProps }>
                { cells }
            </tr>
            );

        if (dragAndDrop) {
            return connectDragSource(connectDropTarget(rowEl));
        }

        return rowEl;

    }

    constructor(props) {
        super(props);
    }

    static propTypes = {
        columnManager: object.isRequired,
        columns: arrayOf(object).isRequired,
        connectDragSource: func,
        connectDropTarget: func,
        data: arrayOf(object),
        dataSource: object,
        dragAndDrop: bool,
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
        connectDragSource: i => i,
        connectDropTarget: i => i,
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
    beginDrag({ getTreeData }) {
        return { getTreeData };
    }
};

const rowTarget = {
    hover(props, monitor, component) {

        const {
            index: hoverIndex,
            id: hoverId,
            isExpanded: hoverIsExpanded,
            parentId: hoverParentId,
            path: hoverPath,
            flatIndex: hoverFlatIndex
        } = props.treeData;

        const {
            lastX,
            getTreeData
        } = monitor.getItem();

        const {
            id,
            index,
            parentId,
            isLastChild,
            isFirstChild,
            flatIndex,
            parentIndex,
            previousSiblingTotalChildren,
            previousSiblingId
        } = getTreeData();

        const path = [...getTreeData().path];

        // console.log(monitor.getItem().getTreeData())

        let targetIndex = hoverIndex;
        let targetParentId = hoverParentId;
        let targetPath = hoverPath;

        // cant drop root
        if (index === -1) {
            return;
        }

        // cant drop child into a path that contains itself
        if (hoverPath.indexOf(id) !== -1) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component)
            .getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (
            hoverBoundingRect.bottom - hoverBoundingRect.top
        ) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        const mouseX = clientOffset.x;

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // if hover occurs over the grabbed row, we need to determine
        // if X position indicates left or right
        if (hoverIndex === index && parentId === hoverParentId) {

            // if a previous X position hasn't been set
            // set, and early return for next hover event
            if (!lastX) {
                monitor.getItem().lastX = mouseX;
                return;
            }

            // X position indicates a move to left
            else if (lastX - DRAG_INCREMENT > mouseX
                && parentId !== -1
                && isLastChild) {

                targetParentId = path[path.length - 2];
                targetIndex = (parentIndex || 0) + 1;
                targetPath.pop();
            }

            // X position indicates a move to right
            else if (lastX + DRAG_INCREMENT < mouseX && !isFirstChild) {
                targetParentId = previousSiblingId;
                targetIndex = previousSiblingTotalChildren;
                targetPath.push(targetParentId);
            }

            // if neither xposition indicates left or right
            // early return
            else {
                return;
            }

        }
        else {
            // Only perform the move when the mouse
            // has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (flatIndex < hoverFlatIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (flatIndex > hoverFlatIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // If hoverIsExpanded, put item as first child instead
            // instead of placing it as a sibling below hovered item
            if (flatIndex < hoverFlatIndex && hoverIsExpanded) {
                targetIndex = 0;
                targetParentId = hoverId;
                targetPath.push(targetParentId);
            }
        }

        // console.log('currentPath', path, 'targetPath', targetPath)

        props.moveRow(
            { id, index, parentId, path },
            { index: targetIndex, parentId: targetParentId, path: targetPath }
        );

        monitor.getItem().lastX = mouseX;
    }

};

export default RowContainer(DropTarget('ROW', rowTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(
    DragSource('ROW', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))(Row)
));
