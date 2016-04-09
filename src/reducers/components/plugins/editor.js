import { fromJS } from 'immutable';

import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE,
    CANCEL_ROW,
    REMOVE_ROW,
    EDITOR_VALIDATION
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    editorState: fromJS.Map
});

export const isCellValid = ({ validator }, value) => {

    if (!validator || !typeof validator === 'function') {
        return true;
    }

    return validator({value});
};

export const isRowValid = (columns, rowValues) => {

    for (let i = 0; i < columns.length; i++) {

        const col = columns[i];
        const val = isCellValid(col, rowValues[col.dataIndex]);

        if (!val) {
            return false;
        }
    }

    return true;
};

export default function editor(state = initialState, action) {

    switch (action.type) {

    case EDIT_ROW:

        return state.set('editorState', {
            row: {
                key: action.rowId,
                values: action.values,
                rowIndex: action.rowIndex,
                top: action.top,
                valid: action.valid !== undefined ? action.valid : true
            }
        });

    case ROW_VALUE_CHANGE:
        const { columns, value } = action;
        const previous = state.get('editorState');

        const rowValues = Object.assign({}, previous.row.values, {
            [action.columnName]: value
        });

        const valid = isRowValid(columns, rowValues);

        return state.set('editorState', Object.assign({}, state.get('editorState'), {
            row: {
                key: previous.row.key,
                values: rowValues,
                rowIndex: previous.row.rowIndex,
                previousValues: previous.row.values,
                top: previous.row.top,
                valid
            }
        }));

    case REMOVE_ROW:
    case DISMISS_EDITOR:
    case CANCEL_ROW:
        return state.set('editorState', {});

    default:
        return state;
    }
}