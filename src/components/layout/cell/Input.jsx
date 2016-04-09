import React, { PropTypes } from 'react';

import { updateCellValue } from './../../../actions/plugins/editor/EditorActions';

export const Input = (
    { cellData, column, columns, editorState, rowId, store }
) => {

    const colName = column
        && column.dataIndex
        ? column.dataIndex
        : '';

    const placeholder = column
        && column.placeholder
        ? column.placeholder
        : false;

    const value = editorState
        && editorState.row
        && editorState.row.values
        && editorState.row.values[colName] !== undefined
        ? editorState.row.values[colName]
        : cellData;

    const inputProps = {
        onChange: handleChange.bind(null, column, columns, rowId, store),
        type: 'text',
        value: value,
        placeholder
    };

    return (
        <input { ...inputProps } />
    );
};

export const handleChange = (
    columnDefinition, columns, rowId, store, reactEvent
) => {
    store.dispatch(
        updateCellValue(
            reactEvent.target.value, columnDefinition.dataIndex, columnDefinition, columns
        )
    );
};

Input.propTypes = {
    cellData: PropTypes.any,
    column: PropTypes.object,
    store: PropTypes.object
};