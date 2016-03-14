import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Editor } from './cell/Editor.jsx';

import { prefix } from '../../util/prefix';
import { stateGetter } from '../../util/stateGetter';
import { elementContains } from '../../util/elementContains';
import { CLASS_NAMES } from '../../constants/GridConstants';

export const Cell = ({ cellData, columns, editorState, events, index, rowId, store }) => {

    const isEditable = editorState
            && editorState.row
            && editorState.row.key === rowId;

    const hidden = columns
            && columns[index]
            && columns[index].hidden !== undefined
            ? columns[index].hidden
            : null;

    const cellProps = {
        className: prefix(CLASS_NAMES.CELL),
        onClick: handleClick.bind(this, events, cellData),
        onDoubleClick: handleDoubleClick.bind(this, events, cellData),
        style: {
            display: hidden ? 'none' : ''
        }
    };

    const cellHTML = getCellHTML(cellData, editorState, isEditable, columns, index, rowId, store);

    return (
        <td { ...cellProps }>
            { cellHTML }
        </td>
        );
};

export const getCellHTML = (cellData, editorState, isEditable, columns, index, rowId, store) => {

    const editorProps = {
        cellData,
        columns,
        editorState,
        index,
        isEditable,
        rowId,
        store
    };

    return (
        <Editor { ...editorProps } />
    );
};

export const handleClick = (events, cellData, reactEvent) => {

    if (reactEvent.target && elementContains(reactEvent.target, prefix(CLASS_NAMES.EDITED_CELL))) {
        reactEvent.stopPropagation();
    }

    if (events.HANDLE_CELL_CLICK) {
        return events.HANDLE_CELL_CLICK.apply(this, arguments);
    }
};

export const handleDoubleClick = (events, cellData, reactEvent) => {

    if (reactEvent.target && elementContains(reactEvent.target, prefix(CLASS_NAMES.EDITED_CELL))) {
        reactEvent.stopPropagation();
    }

    if (events.HANDLE_CELL_CLICK) {
        return events.HANDLE_CELL_DOUBLE_CLICK.apply(this, arguments);
    }
};

Cell.propTypes = {
    cellData: PropTypes.any,
    columns: PropTypes.array,
    data: PropTypes.func,
    editorState: PropTypes.object,
    events: PropTypes.object,
    index: PropTypes.number,
    rowId: PropTypes.string,
    store: PropTypes.object
};

function mapStateToProps(state, props) {
    return {
        editorState: stateGetter(state, props, 'editor', 'editorState')
    };
}

const ConnectedCell = connect(mapStateToProps)(Cell);

export { Cell, ConnectedCell };