import {
    EDIT_ROW
} from '../../../constants/ActionTypes';

export function editRow(rowId, top) {
    return { type: EDIT_ROW, rowId, top };
};