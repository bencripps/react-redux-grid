import {
    ADD_NEW_ROW,
    CANCEL_ROW,
    DISMISS_EDITOR,
    EDIT_ROW,
    EDITOR_VALIDATION,
    ROW_VALUE_CHANGE,
    REMOVE_ROW,
    SAVE_ROW
} from '../../../constants/ActionTypes';

import { keyGenerator } from '../../../util/keyGenerator';

export function editRow(rowId, top, rowData, rowIndex, columns, isCreate) {
    return { type: EDIT_ROW, rowId, top, values: rowData, rowIndex, columns, isCreate };
}

export function dismissEditor() {
    return { type: DISMISS_EDITOR };
}

export function updateCellValue(value, name, column, columns) {
    return { type: ROW_VALUE_CHANGE, value, columnName: name, column, columns };
}

export function saveRow(values, rowIndex) {
    return { type: SAVE_ROW, values, rowIndex };
}

export function cancelRow() {
    return { type: CANCEL_ROW };
}

export function removeRow(rowIndex) {
    return { type: REMOVE_ROW, rowIndex };
}

export function setEditorValidation(validationState) {
    return { type: EDITOR_VALIDATION, validationState };
}

export function addNewRow(columns, data) {

    return (dispatch) => {
        const rowId = keyGenerator('row', 0);
        const top = 43;
        const rowData = data || {};
        const rowIndex = 0;
        const isCreate = true;

        dispatch({ type: ADD_NEW_ROW });

        dispatch(
            editRow(rowId, top, rowData, rowIndex, columns, isCreate)
        );
    };
}