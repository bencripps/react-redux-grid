import { fromJS } from 'immutable';

import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    editorState: fromJS.Map
});

export default function editor(state = initialState, action) {

    switch (action.type) {

    case EDIT_ROW:
        return state.set('editorState', {
            row: {
                key: action.rowId,
                values: action.values,
                top: action.top
            }
        });

    case ROW_VALUE_CHANGE:

        const previous = state.get('editorState');

        const rowValues = Object.assign(previous.row.values, {
            [action.columnName]: action.value
        });

        return state.set('editorState', Object.assign({}, state.get('editorState'), {
            row: {
                top: previous.row.top,
                key: action.rowId,
                values: rowValues
            }
        }));

    case DISMISS_EDITOR:
        return state.set('editorState', {});

    default:
        return state;
    }
}