import { fromJS } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    menuState: fromJS.Map
});

export default function menu(state = initialState, action) {
    
    switch (action.type) {

    case SHOW_MENU:
        return state.set('menuState', {
            [action.id]: true
        });

    case HIDE_MENU:
        return state.set('menuState', {
            [action.id]: false
        });

    default:
        return state;
    }
}