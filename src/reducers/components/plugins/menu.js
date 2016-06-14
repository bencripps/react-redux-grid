import { fromJS } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

const initialState = fromJS({});

export default function menu(state = initialState, action) {

    switch (action.type) {

    case SHOW_MENU:
        return state.setIn([action.stateKey], fromJS({
            [action.id]: true
        }));

    case HIDE_MENU:
        if (action.id) {
            return state.setIn([action.stateKey], fromJS({
                [action.id]: false
            }));
        }

        return state.setIn([action.stateKey], fromJS({}));

    default:
        return state;
    }
}