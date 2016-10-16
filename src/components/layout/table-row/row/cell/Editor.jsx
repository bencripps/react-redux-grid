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
            <span className={ wrapperCls }>
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
            <span className={ wrapperCls }>
                <Input
                    cellData={ value }
                    column={ columns[index] }
                    columns={ columns }
                    editorState={ editorState }
                    rowId={ rowId }
                    stateKey={ stateKey }
                    store={ store }
                />
            </span>
            );
    }

    return (
        <span className={ prefix(CLASS_NAMES.INACTIVE_CLASS) }>
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
    index: number,
    isEditable: bool,
    isRowSelected: bool,
    rawValue: any,
    rowData: object,
    rowId: string,
    stateKey: string,
    store: object
};

Editor.defaultProps = {
    isRowSelected: false
};
