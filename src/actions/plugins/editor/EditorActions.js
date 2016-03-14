import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE,
    SAVE_ROW,
    CANCEL_ROW
} from '../../../constants/ActionTypes';

export function editRow(rowId, top, rowData, rowIndex) {
    return { type: EDIT_ROW, rowId, top, values: rowData, rowIndex };
}

export function dismissEditor() {
    return { type: DISMISS_EDITOR };
}

export function updateCellValue(value, name) {
    return { type: ROW_VALUE_CHANGE, value, columnName: name };
}

export function saveRow(values, rowIndex) {
    return { type: SAVE_ROW, values, rowIndex };
}

export function cancelRow() {
    return { type: CANCEL_ROW };
}