import React, { PropTypes } from 'react';
import { Input } from './editors/Input.jsx';
import { Select } from './editors/Select.jsx';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';
import { prefix } from './../../../../../util/prefix';
import { nameFromDataIndex } from './../../../../../util/getData';

const wrapperCls = prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER);

export const Editor = ({
    cellData, columns, editorState, index, isEditable, rowId, stateKey, store
}) => {

    let column = columns[index]

    let colName = columns
        && column
        ? nameFromDataIndex(column)
        : '';

    if (!colName) {
        colName = columns
        && column
        && column.name
        ? column.name
        : '';
    }

    const value = editorState
        && editorState.row
        && editorState.row.values
        ? editorState.row.values[colName]
        : null;

    const showEditor = (
        isEditable
        && column
        && (column.editable === undefined || column.editable)
    );

    if (showEditor) {
        const showCustomEditor = (
            column.editor
            && typeof column.editor === 'function'
        );
        const showSelectEditor = (
            column.editor
            && Array.isArray(column.editor)
        );

        if (showCustomEditor) {
            const input = column.editor(
                {
                    column,
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
        } else if (showSelectEditor) {
            return (
                <span { ...{ className: wrapperCls } }>
                    <Select {
                            ...{
                                column,
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
        } else {
            return (
                <span { ...{ className: wrapperCls } }>
                    <Input {
                            ...{
                                column,
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
