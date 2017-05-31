import PropTypes from 'prop-types';
import React from 'react';

import {
    updateCellValue
} from './../../../../../actions/plugins/editor/EditorActions';

import {
    nameFromDataIndex
} from './../../../../../util/getData';

import {
    Editor
} from './../../../../../records';

const {
    any,
    array,
    func,
    object,
    string
} = PropTypes;

export const Input = ({
    cellData,
    column,
    columns,
    editorState,
    onBlur,
    onFocus,
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
        : null;

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
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            type="text"
            value={value}
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
    cellData: any,
    column: object,
    columns: array,
    editorState: object,
    onBlur: func,
    onFocus: func,
    rowId: string,
    stateKey: string,
    store: object
};
