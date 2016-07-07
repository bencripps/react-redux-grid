
import React, { PropTypes } from 'react';

import {
    updateCellValue
} from './../../../../../actions/plugins/editor/EditorActions';

import {
    nameFromDataIndex
} from './../../../../../util/getData';

export const Select = ({
    cellData,
    column,
    columns,
    editorState,
    rowId,
    stateKey,
    store
}) => {

    const colName = nameFromDataIndex(column);

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

    const options = column.editor. map(item => {
        let pair
        if (typeof item === 'string') {
            pair = { name: item, value: item }
        } else {
            pair = item
        }

        return (
            <option value={pair.value}>
                {pair.name}
            </option>
            );
        }
    );

    const selectProps = {
        defaultValue: value,  
        onChange: (e) => {
            handleChange(column, columns, rowId, stateKey, store, e);
        }
    }

    return (
        <select defaultValue={value} className="react-grid-edit-item" onChange={(e) => {
                handleChange(column, columns, rowId, stateKey, store, e);
            }
        }
        >
            { options }
        </select>
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

Select.propTypes = {
    cellData: PropTypes.any,
    column: PropTypes.object,
    columns: PropTypes.array,
    editorState: PropTypes.object,
    rowId: PropTypes.string,
    stateKey: PropTypes.string,
    store: PropTypes.object
};