import { fromJS } from 'immutable';

import {
    REMOVE_TOOLBAR
} from './../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default function bulkaction(state = initialState, action) {

    switch (action.type) {

    case REMOVE_TOOLBAR:
        return state.setIn([action.stateKey], fromJS({
            isRemoved: action.value,
            lastUpdate: generateLastUpdate()
        }));

    default:
        return state;
    }
}