import React, { PropTypes } from 'react';

import {
    updateCellValue
} from './../../../actions/plugins/editor/EditorActions';

export const Input = ({
    cellData,
    column,
    columns,
    editorState,
    rowId,
    stateKey,
    store
}) => {

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

    const disabled = editorState
        && editorState.row
        && !editorState.row.isCreate
        && column.editable === 'create';

    const inputProps = {
        disabled,
        onChange: () => {
            handleChange(column, columns, rowId, stateKey, store);
        },
        type: 'text',
        value: value,
        placeholder
    };

    return (
        <input { ...inputProps } />
    );
};

export const handleChange = (
    columnDefinition, columns, rowId, stateKey, store, reactEvent
) => {
    store.dispatch(
        updateCellValue({
            value: reactEvent.target.value,
            name: columnDefinition.dataIndex,
            column: columnDefinition,
            columns,
            stateKey
        })
    );
};

Input.propTypes = {
    cellData: PropTypes.any,
    column: PropTypes.object,
    columns: PropTypes.array,
    editorState: PropTypes.object,
    rowId: PropTypes.string,
    stateKey: PropTypes.string,
    store: PropTypes.object
};