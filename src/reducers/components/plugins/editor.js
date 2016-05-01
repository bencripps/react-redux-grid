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

        const isValid = isRowValid(action.columns, action.values);

        return state.setIn([action.stateKey], {
            row: {
                key: action.rowId,
                values: action.values,
                rowIndex: action.rowIndex,
                top: action.top,
                valid: isValid,
                isCreate: action.isCreate || false
            }
        });

    case ROW_VALUE_CHANGE:
        const { columns, value, stateKey } = action;
        const previous = state.get(stateKey);

        const rowValues = Object.assign({}, previous.row.values, {
            [action.columnName]: value
        });

        columns.forEach((col) => {
            if (col.defaultValue !== undefined
                && rowValues[col.dataIndex] === undefined) {
                rowValues[col.dataIndex] = col.defaultValue;
            }
        });

        const valid = isRowValid(columns, rowValues);

        return state.setIn([action.stateKey], {
            row: {
                key: previous.row.key,
                values: rowValues,
                rowIndex: previous.row.rowIndex,
                previousValues: previous.row.values,
                top: previous.row.top,
                isCreate: previous.row.isCreate || false,
                valid
            }
        });

    case REMOVE_ROW:
    case DISMISS_EDITOR:
    case CANCEL_ROW:
        return state.setIn([action.stateKey], {});

    default:
        return state;
    }
}