import { fromJS } from 'immutable';

import {
    SET_FILTER_VALUE,
    SHOW_FILTER_MENU,
    SET_FILTER_MENU_VALUES
} from '../../../constants/ActionTypes';

const initialState = fromJS({});

export default function filter(state = initialState, action) {

    switch (action.type) {

    case SET_FILTER_VALUE:
        return state.mergeIn([action.stateKey], {
            filterValue: action.value
        });

    case SET_FILTER_MENU_VALUES:

        const newValues = state
            .mergeIn([action.stateKey, 'filterMenuValues'], action.filter)
            .getIn([action.stateKey, 'filterMenuValues']);

        return state.mergeIn([action.stateKey], {
            filterMenuValues: newValues,
            filterMenuShown: true
        });

    case SHOW_FILTER_MENU:
        return state.setIn([action.stateKey], fromJS({
            filterMenuShown: action.metaData.filterMenuShown
        }));

    default:
        return state;
    }
}