import React, { PropTypes } from 'react';
import { Input } from './Input.jsx';
import { CLASS_NAMES } from './../../../constants/GridConstants';
import { prefix } from './../../../util/prefix';

const wrapperCls = prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER);

export const Editor = ({
    cellData, columns, editorState, index, isEditable, rowId, stateKey, store
}) => {

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
                value: value,
                stateKey
            }
        );

        return (
            <span { ...{ className: wrapperCls } }> { input } </span>
            );
    }

    else if (isEditable
        && columns[index]
        && (columns[index].editable === undefined || columns[index].editable)) {
        return (
            <span { ...{ className: wrapperCls } }>
                <Input {
                        ...{
                            column: columns[index],
                            columns,
                            editorState,
                            cellData,
                            rowId,
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

Editor.propTypes = {
    cellData: PropTypes.any,
    columns: PropTypes.array,
    editorState: PropTypes.object,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
    rowId: PropTypes.string,
    stateKey: PropTypes.string,
    store: PropTypes.object
};

Editor.defaultProps = {};