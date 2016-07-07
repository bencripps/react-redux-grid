import React, { PropTypes } from 'react';
import { Input } from './Input.jsx';
import { Select } from './Select.jsx';
import { CLASS_NAMES } from './../../../../../constants/GridConstants';
import { prefix } from './../../../../../util/prefix';
import { nameFromDataIndex } from './../../../../../util/getData';

const wrapperCls = prefix(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER);

export const Editor = ({
    cellData, columns, editorState, index, isEditable, rowId, stateKey, store
}) => {

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

    const value = editorState
        && editorState.row
        && editorState.row.values
        ? editorState.row.values[colName]
        : null;

    const showEditor = (
        isEditable
        && columns[index]
        && (columns[index].editable === undefined || columns[index].editable)
    );

    if (showEditor) {
        const showCustomEditor = (
            columns[index].editor
            && typeof columns[index].editor === 'function'
        );
        const showSelectEditor = (
            columns[index].editor
            && Array.isArray(columns[index].editor)
        );

        if (showCustomEditor) {
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
        } else if (showSelectEditor) {
            return (
                <span { ...{ className: wrapperCls } }>
                    <Select {
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
        } else {
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