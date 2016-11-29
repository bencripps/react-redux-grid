import React, { PropTypes } from 'react';

import {
    updateCellValue
} from './../../../../../actions/plugins/editor/EditorActions';

import {
    nameFromDataIndex
} from './../../../../../util/getData';

import {
    Editor
} from './../../../../../records';

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
    const editorData = editorState && editorState.get
        ? editorState.get(rowId)
        : new Editor();

    const overrides = editorData
        && editorData.values
        && editorData.overrides[colName] !== undefined
        ? editorData.overrides[colName]
        : {};

    const placeholder = column
        && column.placeholder
        ? column.placeholder
        : false;

    const value = editorData
        && editorData.values
        && editorData.values[colName] !== undefined
        ? editorData.values[colName]
        : cellData;

    const disabled = overrides.disabled || (editorState
        && editorData
        && !editorData.isCreate
        && column.editable === 'create');

    const onChange = e => handleChange(
        column, columns, rowId, stateKey, store, e
    );

    return (
        <input
            disabled={disabled}
            onChange={onChange}
            type="text"
            value={value}
            placeholder={placeholder}
        />
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
            rowId,
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
