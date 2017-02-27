import {
    ADD_NEW_ROW,
    CANCEL_ROW,
    DISMISS_EDITOR,
    EDIT_ROW,
    EDITOR_VALIDATION,
    ROW_VALUE_CHANGE,
    REMOVE_ROW,
    REPOSITION_EDITOR,
    SAVE_ROW,
    UPDATE_ROW
} from '../../../constants/ActionTypes';

import { keyGenerator } from '../../../util/keyGenerator';
import { getNewRowId } from '../../../util/getNewRowId';

export const editRow = ({
    rowId,
    top,
    rowData = {},
    rowIndex,
    columns,
    isCreate,
    stateKey,
    editMode = 'inline'
}) => {

    if (!rowId) {
        throw new Error('rowId is a required parameter for editRow Action');
    }

    return {
        type: EDIT_ROW,
        rowId,
        top,
        values: rowData,
        rowIndex,
        columns,
        isCreate,
        stateKey,
        editMode
    };
};

export const repositionEditor = ({ top, stateKey, rowId }) => ({
    type: REPOSITION_EDITOR,
    rowId,
    stateKey,
    top
});

export const dismissEditor = ({ stateKey }) => ({
    type: DISMISS_EDITOR, stateKey
});

export const updateCellValue = ({
    value, name, column, columns, stateKey, rowId
}) => ({
    type: ROW_VALUE_CHANGE,
    value,
    columnName: name,
    column,
    columns,
    stateKey,
    rowId
});

export const saveRow = ({ values, rowIndex, stateKey }) => ({
    type: SAVE_ROW, values, rowIndex, stateKey
});

export const cancelRow = ({ stateKey }) => ({
    type: CANCEL_ROW, stateKey
});

export const removeRow = ({ rowIndex, stateKey }) => ({
    type: REMOVE_ROW, rowIndex, stateKey
});

export const setEditorValidation = ({ validationState, stateKey }) => ({
    type: EDITOR_VALIDATION, validationState, stateKey
});

export const updateRow = ({ stateKey, rowIndex, values }) => ({
    type: UPDATE_ROW,
    stateKey,
    rowIndex,
    values
});

export const addNewRow = ({
    columns,
    data,
    stateKey,
    editMode = 'inline',
    rowIndex = 0,
    isCreate = true
}) => (dispatch) => {
    const rowId = keyGenerator('row', getNewRowId());
    const top = 43;
    const rowData = data || {};

    dispatch({ type: ADD_NEW_ROW, stateKey, rowId, rowIndex });

    dispatch(
        editRow({
            rowId,
            top,
            rowData,
            rowIndex,
            columns,
            isCreate,
            stateKey,
            editMode
        })
    );
};
