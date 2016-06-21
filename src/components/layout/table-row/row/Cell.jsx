import React, { PropTypes } from 'react';

import { Editor } from './cell/Editor.jsx';
import { prefix } from '../../../../util/prefix';
import { handleEditClick } from './../../../../util/handleEditClick';
import { elementContains } from './../../../../util/elementContains';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

export const Cell = ({
    cellData,
    columns,
    editor,
    editorState,
    events,
    index,
    rowData,
    rowIndex,
    rowId,
    stateKey,
    selectionModel,
    store
}) => {

    const isEditable = editorState
            && editorState.row
            && editorState.row.key === rowId;

    const hidden = columns
            && columns[index]
            && columns[index].hidden !== undefined
            ? columns[index].hidden
            : null;

    const cellClickArguments = {
        events,
        columns,
        cellData,
        editor,
        editorState,
        rowIndex,
        rowData,
        rowId,
        selectionModel,
        stateKey,
        store
    };

    const cellProps = {
        className: prefix(CLASS_NAMES.CELL),
        onClick: (e) => {
            return handleClick(cellClickArguments, e);
        },
        onDoubleClick: (e) => {
            return handleDoubleClick(cellClickArguments, e);
        },
        style: {}
    };

    if (hidden) {
        cellProps.style.display = 'none';
    }

    const cellHTML = getCellHTML(
        cellData,
        editorState,
        isEditable,
        columns,
        index,
        rowId,
        stateKey,
        store
    );

    return (
        <td { ...cellProps }>
            { cellHTML }
        </td>
        );
};

export const getCellHTML = (
    cellData, editorState, isEditable, columns, index, rowId, stateKey, store
) => {

    const editorProps = {
        cellData,
        columns,
        editorState,
        index,
        isEditable,
        rowId,
        store,
        stateKey
    };

    if (isEditable) {
        return (
            <Editor { ...editorProps } />
        );
    }

    return (
        <span>
            { cellData }
        </span>
        );

};

export const handleClick = ({
    events,
    columns,
    cellData,
    editor,
    editorState,
    rowIndex,
    rowData,
    rowId,
    selectionModel,
    stateKey,
    store
}, reactEvent) => {

    if (reactEvent.target
        && elementContains(
            reactEvent.target, prefix(CLASS_NAMES.EDITED_CELL))
        ) {
        reactEvent.stopPropagation();
    }

    if (selectionModel.defaults.editEvent
        === selectionModel.eventTypes.singleclick) {

        if (!editorState || Object.keys(editorState).length === 0) {
            handleEditClick(
                editor,
                store,
                rowId,
                rowData,
                rowIndex,
                columns,
                stateKey,
                { reactEvent }
            );
        }

        else if (editorState && editorState.row
            && editorState.row.rowIndex !== rowIndex) {
            handleEditClick(
                editor,
                store,
                rowId,
                rowData,
                rowIndex,
                columns,
                stateKey,
                { reactEvent }
            );
        }
    }

    if (events.HANDLE_CELL_CLICK) {
        return events.HANDLE_CELL_CLICK.apply(this, arguments);
    }
};

export const handleDoubleClick = ({
    events,
    columns,
    cellData,
    editor,
    editorState,
    rowIndex,
    rowData,
    rowId,
    selectionModel,
    stateKey,
    store
}, reactEvent) => {

    if (reactEvent.target
        && elementContains(
            reactEvent.target, prefix(CLASS_NAMES.EDITED_CELL))
        ) {
        reactEvent.stopPropagation();
    }

    if (selectionModel.defaults.editEvent
        === selectionModel.eventTypes.doubleclick) {
        handleEditClick(
            editor,
            store,
            rowId,
            rowData,
            rowIndex,
            { reactEvent }
        );
    }

    if (events.HANDLE_CELL_DOUBLE_CLICK) {
        return events.HANDLE_CELL_DOUBLE_CLICK.apply(this, arguments);
    }
};

Cell.propTypes = {
    cellData: PropTypes.any,
    columns: PropTypes.array,
    data: PropTypes.func,
    editor: PropTypes.object,
    editorState: PropTypes.object,
    events: PropTypes.object,
    index: PropTypes.number,
    rowData: PropTypes.object,
    rowId: PropTypes.string,
    rowIndex: PropTypes.number,
    selectionModel: PropTypes.object,
    stateKey: PropTypes.string,
    store: PropTypes.object
};

export { Cell };