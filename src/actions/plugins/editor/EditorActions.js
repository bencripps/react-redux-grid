import {
    EDIT_ROW,
    DISMISS_EDITOR
} from '../../../constants/ActionTypes';

export function editRow(rowId, top) {
    return { type: EDIT_ROW, rowId, top };
};

export function dismissEditor() {
    return { type: DISMISS_EDITOR };
};