import { fromJS } from 'immutable';

import {
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from '../../constants/ActionTypes';

const initialState = fromJS({});

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case SET_COLUMNS:
        return state.setIn([action.stateKey], fromJS({
            columns: action.columns
        }));

    case SET_SORT_DIRECTION:
        return state.setIn([action.stateKey], fromJS({
            columns: action.columns
        }));

    case RESIZE_COLUMNS:
        return state.setIn([action.stateKey], fromJS({
            columns: action.columns
        }));

    default:

        return state;
    }
}