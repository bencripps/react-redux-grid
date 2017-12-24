import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { isPluginEnabled } from '../../../util/isPluginEnabled';

import { Cell } from './row/Cell';
import { EmptyCell } from './row/EmptyCell';
import RowContainer from './row/RowContainer';

import { prefix } from '../../../util/prefix';
import { fireEvent } from '../../../util/fire';
import { getData, getRowKey } from '../../../util/getData';
import { gridConfig } from '../../../constants/GridConstants';

const { arrayOf, bool, func, object, string, oneOf, number, oneOfType } = PropTypes;

const DRAG_INCREMENT = 15;

export class Row extends Component {

    render() {
        const { CLASS_NAMES } = gridConfig();
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
            stateful,
            stateKey,
            store,
            treeData
        } = this.props;

        const id = row.get('_key');

        const visibleColumns = columns.filter((col) => !col.hidden);
        const cellValues = getCellValues(columns, row);

        if (Object.keys(row).length !== columns.length) {
            addEmptyCells(row, columns);
        }

        const isSelected = selectedRows
            ? selectedRows.get(id)
            : false;

        const cells = Object.keys(cellValues).map((k, i) => {

            const key = getRowKey(columns, row, columns[i].dataIndex);
            const cellData = getCellData(
                columns, editor, editorState, row, k, i, store
            );
            const cellTreeData = {
                ...treeData,
                expandable: columns[i].expandable
            };

            return (
                <Cell
                    cellData={cellData}
                    columns={columns}
                    dragAndDrop={dragAndDrop}
                    editor={editor}
                    editorState={editorState}
                    events={events}
                    gridType={gridType}
                    index={i}
                    isRowSelected={isSelected}
                    key={ key }
                    readFunc={readFunc}
                    reducerKeys={reducerKeys}
                    row={cellValues}
                    rowId={id}
                    rowIndex={index}
                    selectionModel={selectionModel}
                    showTreeRootNode={showTreeRootNode}
                    stateKey={stateKey}
                    stateful={stateful}
                    store={store}
                    treeData={cellTreeData}
                />);

        });

        const editClass = editorState
            && editorState.get(id)
            && editor.config.type !== 'grid'
            ? selectionModel.defaults.editCls
            : '';

        const selectedClass = isSelected
            ? selectionModel.defaults.activeCls
            : '';

        const dragClass = isDragging
            ? CLASS_NAMES.ROW_IS_DRAGGING
            : '';

        const rowProps = {
            className: prefix(
                CLASS_NAMES.ROW,
                selectedClass,
                editClass,
                dragClass
            ),
            onClick: (e) => {
                handleRowSingleClickEvent(
                    events, row, id, selectionModel, index, isSelected, e
                );
            },
            onDoubleClick: (e) => {
                handleRowDoubleClickEvent(
                    events, row, id, selectionModel, index, isSelected, e
                );
            },
            onDragStart: this.handleDragStart.bind(this)
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

        selectionModel.updateCells({
            cells,
            rowId: id,
            index,
            type: 'row',
            reducerKeys,
            stateKey,
            rowData: cellValues,
            isSelected: !isSelected
        });

        addEmptyInsert(cells, visibleColumns, plugins, id);

        let rowEl;

        if (isPluginEnabled(plugins, 'ROW') &&
          typeof plugins.ROW.renderer === 'function') {
        	// super important that we pass rowProps and cells
        	// since the user is almost certainly going to want both
        	// lets make sure this gets documented
            rowEl = plugins.ROW.renderer({ rowProps, cells, row });
        } else {
            rowEl = (
                <tr { ...rowProps }>
                    { cells }
                </tr>
            );
        }

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
        findRow: func.isRequired,
        gridType: oneOf([
            'tree', 'grid'
        ]),
        index: number,
        isDragging: bool,
        menuState: object,
        nextRow: object,
        pageSize: number,
        pager: object,
        plugins: object,
        previousRow: object,
        readFunc: func,
        reducerKeys: oneOfType([object, string]),
        row: object,
        selectedRows: object,
        selectionModel: object,
        showTreeRootNode: bool,
        stateKey: string,
        stateful: bool,
        store: object.isRequired,
        treeData: object
    };

    static defaultProps = {
        connectDragSource: i => i,
        connectDropTarget: i => i,
        emptyDataMessage: 'No Data Available',
        treeData: {}
    };

    handleDragStart(e) {
        const { row } = this.props;

        // this has nothing to do with grid drag and drop
        // only use is setting meta data for custom drop events
        // per issue #59
        e.dataTransfer.setData('text/plain', JSON.stringify({
            id: row.get('_key'),
            data: row.toJS()
        }));

        return e;
    }
}

export const getCellValues = (columns, row) => {
    const result = {};
    const dataIndexes = columns.map(col => col.dataIndex);

    dataIndexes.forEach(idx => {
        result[idx] = row.get(idx);
    });

    return result;
};

export const addEmptyInsert = (cells, visibleColumns, plugins, id) => {

    if (visibleColumns.length === 0) {

        if (plugins
            && plugins.GRID_ACTIONS
            && plugins.GRID_ACTIONS.menu
            && plugins.GRID_ACTIONS.menu.length > 0) {
            cells.splice(1, 0, <EmptyCell { ...{ key: `${id}-Grid-Action` } } />);
        }

        else {
            cells.push(<EmptyCell { ...{ key: `${id}-Empty-Cell`} } />);
        }
    }

    return cells;
};

export const getCellData = (
    columns, editor, editorState, row, key, index, store
) => {

    const rowId = row.get('_key');

    // if a renderer is present, but
    // were in edited mode, we should use the edited values
    // since those could be modified using a 'change' function
    const editedValues = editorState
        && editorState.get(rowId)
        && editorState.get(rowId).values
        ? editorState.get(rowId).values
        : new Map();

    const valueAtDataIndex = getData(row, columns, index, editedValues);

    // if a render has been provided, default to this
    // as long as editor type isnt 'grid'
    if (row
        && columns[index]
        && columns[index].renderer
        && typeof columns[index].renderer === 'function') {
        return columns[index].renderer({
            column: columns[index],
            value: valueAtDataIndex,
            row: row.toJS(),
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

export const addEmptyCells = (row, columns) => {

    columns.forEach((col) => {

        // const data = nameFromDataIndex(col);
        // come back to this
        // how we retrieve and store data, especially editable
        // may need to be updated based on array dataIndex

        if (row && !row.get(col.dataIndex)) {
            row.set(col.dataIndex, '');
        }

    });

    return row;
};

export const handleRowDoubleClickEvent = (
    events,
    row,
    rowId,
    selectionModel,
    index,
    isSelected,
    reactEvent,
    id,
    browserEvent
) => {
    if (selectionModel
            && selectionModel.defaults.selectionEvent
                === selectionModel.eventTypes.doubleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index,
            data: row,
            selected: !isSelected
        });
    }

    fireEvent(
        'HANDLE_ROW_DOUBLE_CLICK',
        events,
        {
            id,
            isSelected,
            row,
            rowId
        },
        browserEvent
    );

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
    events,
    row,
    rowId,
    selectionModel,
    index,
    isSelected,
    reactEvent,
    id,
    browserEvent
) => {

    if (getSelectedText()) {
        return false;
    }

    const beforeRowSingleClick = fireEvent(
        'HANDLE_BEFORE_ROW_CLICK',
        events,
        {
            row,
            rowId,
            id
        },
        browserEvent
    );

    if (beforeRowSingleClick === false) {
        return;
    }

    if (selectionModel
            && selectionModel.defaults.selectionEvent
                === selectionModel.eventTypes.singleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index,
            data: row,
            selected: !isSelected
        });
    }

    fireEvent(
        'HANDLE_ROW_CLICK',
        events,
        {
            id,
            isSelected,
            row,
            rowId,
            rowOndex: index
        },
        browserEvent
    );
};

const rowSource = {
    beginDrag({ getTreeData, row }) {
        return {
            getTreeData,
            _id: row.get('_id'),
            _index: row.get('_index'),
            _parentId: row.get('_parentId'),
            _path: row.get('_path')
        };
    },
    endDrag({ getTreeData, moveRow }, monitor) {
        const { id, index, parentId, path } = getTreeData();
        const { _index, _parentId, _path } = monitor.getItem();

        if (!monitor.didDrop()) {
            moveRow(
                { id, index, parentId, path },
                { index: _index, parentId: _parentId, path: _path }
            );
        }
    }
};

const rowTarget = {
    hover(props, monitor, component) {

        const {
            events: hoverEvents,
            row: hoverRow,
            previousRow: hoverPreviousRow
        } = props;

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
            getTreeData,
            row
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

        const path = [...getTreeData().path.toJS()];
        const targetPath = hoverPath.toJS();

        let targetIndex = hoverIndex;
        let targetParentId = hoverParentId;

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

                const validDrop = fireEvent(
                    'HANDLE_BEFORE_TREE_CHILD_CREATE',
                    hoverEvents,
                    {
                        row,
                        previousRow: hoverPreviousRow
                    },
                    null
                );

                if (validDrop === false) {
                    return;
                }
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
                const validDrop = fireEvent(
                    'HANDLE_BEFORE_TREE_CHILD_CREATE',
                    hoverEvents,
                    {
                        row,
                        hoverRow
                    },
                    null
                );

                if (validDrop === false) {
                    return;
                }

                targetIndex = 0;
                targetParentId = hoverId;
                targetPath.push(targetParentId);
            }
        }

        props.moveRow(
            { id, index, parentId, path },
            { index: targetIndex, parentId: targetParentId, path: targetPath }
        );

        monitor.getItem().lastX = mouseX;
    },

    drop(props, monitor) {
        const { events, getTreeData, findRow } = props;
        const { _id } = monitor.getItem();
        const row = findRow(data => data.get('_id') === _id);

        if (row) {
            fireEvent(
                'HANDLE_AFTER_ROW_DROP',
                events,
                {
                    row,
                    ...getTreeData()
                },
                null
            );
        }
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
