import React, { PropTypes } from 'react';
import { Input } from './Input';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';
import { prefix } from './../../../../../util/prefix';
import { nameFromDataIndex } from './../../../../../util/getData';

const wrapperCls = prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER);

export const Editor = ({
    cellData,
    columns,
    editorState,
    rawValue,
    index,
    isEditable,
    rowData,
    isRowSelected,
    rowId,
    stateKey,
    store
}) => {

    if (!editorState) {
        editorState = {};
    }

    if (!editorState[rowId]) {
        editorState[rowId] = {};
    }

    editorState[rowId].key = rowId;

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

    const value = editorState[rowId].values
        ? editorState[rowId].values[colName]
        : rawValue;

    const editableFuncArgs = {
        row: editorState[rowId],
        isRowSelected,
        store
    };

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
                row: editorState[rowId] && editorState[rowId].values
                    ? { ...rowData, ...cleanProps(editorState[rowId].values) }
                    : { key: rowId, ...rowData },
                columnIndex: index,
                value,
                isRowSelected,
                stateKey
            }
        );

        return (
            <span { ...{ className: wrapperCls } }> { input } </span>
            );
    }

    else if (isEditable
        && columns[index]
        && (columns[index].editable === undefined || columns[index].editable)
        && (typeof columns[index].editable === 'function'
                ? columns[index].editable(editableFuncArgs)
                : true)) {
        return (
            <span { ...{ className: wrapperCls } }>
                <Input {
                        ...{
                            column: columns[index],
                            columns,
                            editorState,
                            rowId,
                            cellData: value,
                            stateKey,
                            store
                        }
                    }
                />
            </span>
            );
    }

    return (
        <span { ...{ className: prefix(CLASS_NAMES.INACTIVE_CLASS) } } >
            { cellData }
        </span>
        );
};

export const cleanProps = (obj = {}) => {
    Object.keys(obj).forEach(k => obj[k] === undefined && delete obj[k]);
    return obj;
};

Editor.propTypes = {
    cellData: PropTypes.any,
    columns: PropTypes.array,
    editorState: PropTypes.object,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
    isRowSelected: PropTypes.bool,
    rawValue: PropTypes.any,
    rowId: PropTypes.string,
    stateKey: PropTypes.string,
    store: PropTypes.object
};

Editor.defaultProps = {
    isRowSelected: false
};
