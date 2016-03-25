import React, { PropTypes } from 'react';
import { Input } from './Input.jsx';

export const Editor = ({ cellData, columns, editorState, index, isEditable, rowId, store }) => {

    let colName = columns
        && columns[index]
        && columns[index].dataIndex
        ? columns[index].dataIndex
        : '';

    if (!colName) {
        colName = columns
        && columns[index]
        && columns[index].name
        ? columns[index].name
        : '';
    }

    const value = editorState
        && editorState.row
        && editorState.row.values
        ? editorState.row.values[colName]
        : null;

    if (isEditable
        && columns[index]
        && columns[index].editor
        && (columns[index].editable === undefined || columns[index].editable)
        && typeof columns[index].editor === 'function') {

        const input = columns[index].editor(
            {
                column: columns[index],
                columns,
                store,
                rowId,
                row: editorState.row,
                columnIndex: index,
                value: value
            }
        );

        return (
            <span> { input } </span>
            );
    }

    else if (isEditable
        && columns[index]
        && (columns[index].editable === undefined || columns[index].editable)) {
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
    cellData: PropTypes.any,
    columns: PropTypes.array,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
    rowId: PropTypes.string,
    store: PropTypes.object
};

Editor.defaultProps = {};