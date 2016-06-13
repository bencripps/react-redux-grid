import { fromJS } from 'immutable';

import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL
} from '../../../constants/ActionTypes';

const initialState = fromJS({});

export default function selection(state = initialState, action) {

    switch (action.type) {

    case SELECT_ALL:
        return state.setIn([action.stateKey], fromJS(action.selection));

    case DESELECT_ALL:
        return state.setIn([action.stateKey], fromJS({}));

    case SET_SELECTION:
        const currentValue = state.getIn([action.stateKey, action.id]);

        if (action.clearSelections || !state.get(action.stateKey)) {
            return state.setIn([action.stateKey], fromJS({
                [action.id]: action.allowDeselect ? !currentValue : true
            }));
        }

        // multiselect
        return state.mergeIn([action.stateKey], fromJS({
            [action.id]: action.allowDeselect ? !currentValue : true
        }));

    default:
        return state;
    }
}