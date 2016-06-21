import { fromJS } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default function menu(state = initialState, action) {

    switch (action.type) {

    case SHOW_MENU:
        return state.setIn([action.stateKey], fromJS({
            [action.id]: true,
            lastUpdate: generateLastUpdate()
        }));

    case HIDE_MENU:
        if (action.id) {
            return state.setIn([action.stateKey], fromJS({
                [action.id]: false,
                lastUpdate: generateLastUpdate()
            }));
        }

        return state.setIn(
            [action.stateKey],
            fromJS({ lastUpdate: generateLastUpdate() })
        );

    default:
        return state;
    }
}