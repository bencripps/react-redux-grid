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

export function editRow({
    rowId, top, rowData, rowIndex, columns, isCreate, stateKey
}) {
    return {
        type: EDIT_ROW,
        rowId,
        top,
        values: rowData,
        rowIndex,
        columns,
        isCreate,
        stateKey
    };
}

export function repositionEditor({ top, stateKey }) {
    return {
        type: REPOSITION_EDITOR,
        stateKey,
        top
    };
}

export function dismissEditor({ stateKey }) {
    return { type: DISMISS_EDITOR, stateKey };
}

export function updateCellValue({ value, name, column, columns, stateKey }) {
    return {
        type: ROW_VALUE_CHANGE,
        value,
        columnName: name,
        column,
        columns,
        stateKey
    };
}

export function saveRow({ values, rowIndex, stateKey }) {
    return { type: SAVE_ROW, values, rowIndex, stateKey };
}

export function cancelRow({ stateKey }) {
    return { type: CANCEL_ROW, stateKey };
}

export function removeRow({ rowIndex, stateKey }) {
    return { type: REMOVE_ROW, rowIndex, stateKey };
}

export function setEditorValidation({ validationState, stateKey }) {
    return { type: EDITOR_VALIDATION, validationState, stateKey };
}

export function updateRow({ stateKey, rowIndex, values }) {
    return {
        type: UPDATE_ROW,
        stateKey,
        rowIndex,
        values
    };
}

export function addNewRow({ columns, data, stateKey }) {

    return (dispatch) => {
        const rowId = keyGenerator('row', 0);
        const top = 43;
        const rowData = data || {};
        const rowIndex = 0;
        const isCreate = true;

        dispatch({ type: ADD_NEW_ROW, stateKey, rowId });

        dispatch(
            editRow({
                rowId,
                top,
                rowData,
                rowIndex,
                columns,
                isCreate,
                stateKey
            })
        );
    };
}
