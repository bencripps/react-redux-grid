import { fromJS } from 'immutable';

import {
    ERROR_OCCURRED,
    DISMISS_ERROR
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    errorState: fromJS.Map
});

export default function errorhandler(state = initialState, action) {

    switch (action.type) {

    case ERROR_OCCURRED:
        return state.set('errorState', {
        	error: action.error,
        	errorOccurred: true
        });

    case DISMISS_ERROR:
        return state.set('errorState', {
            error: '',
            errorOccurred: false
        });

    default:
        return state;
    }
}