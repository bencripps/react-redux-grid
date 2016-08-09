import { fromJS } from 'immutable';

import {
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION,
    HIDE_HEADER
} from './../../constants/ActionTypes';

import { generateLastUpdate } from './../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case HIDE_HEADER:
        return state.mergeIn([action.stateKey], fromJS({
            headerHidden: action.headerHidden,
            lastUpdate: generateLastUpdate()
        }));

    case SET_COLUMNS:
        return state.mergeIn([action.stateKey], fromJS({
            columns: action.columns,
            lastUpdate: generateLastUpdate()
        }));

    case SET_SORT_DIRECTION:
        return state.mergeIn([action.stateKey], fromJS({
            columns: action.columns,
            lastUpdate: generateLastUpdate()
        }));

    case RESIZE_COLUMNS:
        return state.mergeIn([action.stateKey], fromJS({
            columns: action.columns,
            lastUpdate: generateLastUpdate()
        }));

    default:

        return state;
    }
}
