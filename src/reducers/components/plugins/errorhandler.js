import { fromJS } from 'immutable';

import {
    ERROR_OCCURRED,
    DISMISS_ERROR
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default function errorhandler(state = initialState, action) {

    switch (action.type) {

    case ERROR_OCCURRED:
        return state.set(action.stateKey, fromJS({
            error: action.error,
            errorOccurred: true,
            lastUpdate: generateLastUpdate()
        }));

    case DISMISS_ERROR:
        return state.set(action.stateKey, fromJS({
            error: '',
            errorOccurred: false,
            lastUpdate: generateLastUpdate()
        }));

    default:
        return state;
    }
}