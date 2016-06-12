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
        return state.setIn([action.stateKey], action.selection);

    case DESELECT_ALL:
        return state.setIn([action.stateKey], {});

    case SET_SELECTION:

        const currentValue = state.get(action.stateKey)
            ? state.get(action.stateKey)[action.id]
            : false;

        if (action.clearSelections || !state.get(action.stateKey)) {
            return state.setIn([action.stateKey], {
                [action.id]: currentValue && action.allowDeselect ? false : true
            });
        }

        // enable multiselect
        return state.setIn([action.stateKey], {
            [action.id]: currentValue && action.allowDeselect ? false : true
        });

    default:
        return state;
    }
}