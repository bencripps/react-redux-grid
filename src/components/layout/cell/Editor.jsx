import React, { PropTypes } from 'react';
import { Input } from './Input.jsx';

export const Editor = ({ cellData, columns, editorState, index, isEditable, rowId, store }) => {

    const colName = columns[index].name;

    const value = editorState
        && editorState.row
        && editorState.row.values
        && editorState.row.values[colName]
        ? editorState.row.values[colName]
        : cellData;

    if (isEditable
        && columns[index].editor
        && typeof columns[index].editor === 'function') {

        const input = columns[index].editor(value, editorState, rowId, columns, index);

        return (
            <span> { input } </span>
            );
    }

    else if (isEditable) {
        return (
                 <span>
                    <Input { ...{ column: columns[index], editorState, cellData, rowId, store } } />
                 </span>
            );
    }

    return (
        <span> { cellData } </span>
        );
};

Editor.propTypes = {
    cellData: PropTypes.string,
    columns: PropTypes.array,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
    rowId: PropTypes.string,
    store: PropTypes.object
};

Editor.defaultProps = {};