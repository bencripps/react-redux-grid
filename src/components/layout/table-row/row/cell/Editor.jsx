import PropTypes from 'prop-types';
import React from 'react';
import { Input } from './Input';
import { gridConfig } from './../../../../../constants/GridConstants';
import { prefix } from './../../../../../util/prefix';
import { fireEvent } from './../../../../../util/fire';
import { nameFromDataIndex } from './../../../../../util/getData';

export const Editor = ({
    cellData,
    columns,
    editorState,
    events,
    rawValue,
    index,
    isEditable,
    row,
    isRowSelected,
    rowId,
    stateKey,
    store
}) => {

    const { CLASS_NAMES } = gridConfig();

    let colName = columns
        && columns[index]
        ? nameFromDataIndex(columns[index])
        : '';

    if (!colName) {
        colName = columns
        && columns[index]
        && columns[index].name
            ? columns[index].name
            : '';
    }

    const editorData = editorState
        ? editorState.get(rowId) || new Map()
        : new Map();

    const invalid = editorData
        && editorData.invalidCells
        && editorData.invalidCells.contains(colName)
        ? true
        : null;

    const value = editorData.values
        && editorData.values.get
        ? editorData.values.get(colName)
        : rawValue;

    const editableFuncArgs = {
        row: editorData && editorData.toJS
            ? editorData.toJS()
            : editorData || {},
        isRowSelected,
        store
    };

    const wrapperCls = prefix(
        CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER,
        invalid ? CLASS_NAMES.EDITOR.INVALID : ''
    );

    const onFocus = () => fireEvent(
        'HANDLE_EDITOR_FOCUS',
        events,
        {
            column: columns[index],
            rowId,
            editor: editorData
        }
    );

    const onBlur = () => fireEvent(
        'HANDLE_EDITOR_BLUR',
        events,
        {
            column: columns[index],
            rowId,
            editor: editorData
        }
    );

    if (isEditable
        && columns[index]
        && columns[index].editor
        && (columns[index].editable === undefined || columns[index].editable)
        && (typeof columns[index].editable === 'function'
                ? columns[index].editable(editableFuncArgs)
                : true)
        && typeof columns[index].editor === 'function') {

        const input = columns[index].editor(
            {
                column: columns[index],
                columns,
                store,
                rowId,
                onFocus,
                onBlur,
                row: editorData && editorData.values && editorData.toJS
                    ? { ...row, ...cleanProps(editorData.values.toJS()) }
                    : { key: rowId, ...row },
                columnIndex: index,
                value: value && value.toJS ? value.toJS() : value,
                isRowSelected,
                stateKey,
                isCreate: editorData.isCreate
            }
        );

        return (
            <span className={wrapperCls}>
                { input }
            </span>
        );
    }

    else if (isEditable
        && columns[index]
        && (columns[index].editable === undefined || columns[index].editable)
        && (typeof columns[index].editable === 'function'
                ? columns[index].editable(editableFuncArgs)
                : true)) {

        return (
            <span className={wrapperCls}>
                <Input
                    cellData={value}
                    column={columns[index]}
                    columns={columns}
                    editorState={editorState}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    rowId={rowId}
                    stateKey={stateKey}
                    store={store}
                />
            </span>
        );
    }

    return (
        <span className={prefix(CLASS_NAMES.INACTIVE_CLASS)}>
            { cellData }
        </span>
    );
};

export const cleanProps = (obj = {}) => {
    Object.keys(obj).forEach(k => obj[k] === undefined && delete obj[k]);
    return obj;
};

const { any, array, bool, number, object, string } = PropTypes;

Editor.propTypes = {
    cellData: any,
    columns: array,
    editorState: object,
    events: object,
    index: number,
    isEditable: bool,
    isRowSelected: bool,
    rawValue: any,
    row: object,
    rowId: string,
    stateKey: string,
    store: object
};

Editor.defaultProps = {
    isRowSelected: false
};
