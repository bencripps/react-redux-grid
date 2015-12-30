import { fromJS } from 'immutable';

import {
    EDIT_ROW
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
                top: action.top
            }
        });

    default:
        return state;
    }
}