import { fromJS } from 'immutable';

import {
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from './../../constants/ActionTypes';

import { generateLastUpdate } from './../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case SET_COLUMNS:
        return state.setIn([action.stateKey], fromJS({
            columns: action.columns,
            lastUpdate: generateLastUpdate()
        }));

    case SET_SORT_DIRECTION:
        return state.setIn([action.stateKey], fromJS({
            columns: action.columns,
            lastUpdate: generateLastUpdate()
        }));

    case RESIZE_COLUMNS:
        return state.setIn([action.stateKey], fromJS({
            columns: action.columns,
            lastUpdate: generateLastUpdate()
        }));

    default:

        return state;
    }
}