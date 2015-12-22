import { fromJS } from 'immutable';

import {
    SET_SELECTION
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    selectedRows: fromJS.Map
});

export default function selection(state = initialState, action) {

    switch (action.type) {

    case SET_SELECTION:

    	if (action.clear) {
    		return state.set('selectedRows',
	            {
	                [action.id]: true
	            }
	        );
    	}

    	else {
	        return state.set('selectedRows', Object.assign({}, state.get('selectedRows'),
	            {
	                [action.id]: true
	            }
	        ));
    	}

    default:
        return state;
    }
}