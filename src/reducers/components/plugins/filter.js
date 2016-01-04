import { fromJS } from 'immutable';

import {
    SET_FILTER_VALUE
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    filterState: fromJS.Map
});

export default function filter(state = initialState, action) {

    switch (action.type) {

    case SET_FILTER_VALUE:
        return state.set('filterState', {
            filterValue: action.value
        });

    default:
        return state;
    }
}