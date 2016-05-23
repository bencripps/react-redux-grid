import { fromJS } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

const initialState = fromJS({});

export default function menu(state = initialState, action) {

    switch (action.type) {

    case SHOW_MENU:
        return state.setIn([action.stateKey], {
            [action.id]: true
        });

    case HIDE_MENU:

        if (action.id) {
            return state.setIn([action.stateKey], {
                [action.id]: false
            });
        }

        else {
            return state.setIn([action.stateKey], {});
        }

    default:
        return state;
    }
}