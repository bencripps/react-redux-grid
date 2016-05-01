import { fromJS } from 'immutable';

import {
    SET_FILTER_VALUE,
    SHOW_FILTER_MENU,
    SET_FILTER_MENU_VALUES
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    filterState: fromJS.Map
});

export default function filter(state = initialState, action) {

    switch (action.type) {

    case SET_FILTER_VALUE:
        return state.mergeIn([action.stateKey], {
            filterValue: action.value
        });

    case SET_FILTER_MENU_VALUES:
        return state.mergeIn([action.stateKey], {
            filterMenuValues: Object.assign(
                state.get(action.stateKey).filterMenuValues || {}, action.filter
            ),
            filterMenuShown: true
        });

    case SHOW_FILTER_MENU:
        return state.setIn([action.stateKey], {
            filterMenuShown: action.metaData.filterMenuShown
        });

    default:
        return state;
    }
}