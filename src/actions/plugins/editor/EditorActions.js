import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE
} from '../../../constants/ActionTypes';

export function editRow(rowId, top, rowData) {
    return { type: EDIT_ROW, rowId, top, values: rowData };
}

export function dismissEditor() {
    return { type: DISMISS_EDITOR };
}

export function updateCellValue(value, rowId, name) {
    return { type: ROW_VALUE_CHANGE, value, rowId, columnName: name };
}