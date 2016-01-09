import { fromJS } from 'immutable';

import {
    SET_FILTER_VALUE,
    SHOW_FILTER_MENU
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    filterState: fromJS.Map
});

export default function filter(state = initialState, action) {

    switch (action.type) {

    case SET_FILTER_VALUE:
        return state.set('filterState', Object.assign({}, state.get('filterState'),
            {
                filterValue: action.value
            }
        ));

    case SHOW_FILTER_MENU:
        return state.set('filterState', Object.assign({}, state.get('filterState'),
            {
                filterMenuShown: action.shown
            }
        ));

    default:
        return state;
    }
}