import React, { PropTypes } from 'react';

import {
    updateCellValue
} from './../../../../../actions/plugins/editor/EditorActions';

import {
    nameFromDataIndex
} from './../../../../../util/getData';

export const Input = ({
    cellData,
    column,
    columns,
    editorState,
    rowId,
    stateKey,
    store
}) => {

    const colName = nameFromDataIndex(column);

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
        onChange: (e) => {
            handleChange(column, columns, rowId, stateKey, store, e);
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
            name: nameFromDataIndex(columnDefinition),
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