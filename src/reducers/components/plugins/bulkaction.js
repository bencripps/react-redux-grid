import { fromJS } from 'immutable';

import {
    REMOVE_TOOLBAR
} from '../../../constants/ActionTypes';

const initialState = fromJS({});

export default function bulkaction(state = initialState, action) {

    switch (action.type) {

    case REMOVE_TOOLBAR:
        return state.setIn([action.stateKey], {
            isRemoved: action.value
        });

    default:
        return state;
    }
}