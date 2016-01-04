import { fromJS } from 'immutable';

import {
    REMOVE_TOOLBAR
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    bulkActionState: {
        isRemoved: true
    }
});

export default function bulkaction(state = initialState, action) {

    switch (action.type) {

    case REMOVE_TOOLBAR:
        return state.set('bulkActionState', {
            isRemoved: action.value
        });

    default:
        return state;
    }
}