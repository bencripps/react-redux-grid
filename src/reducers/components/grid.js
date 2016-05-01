import { fromJS } from 'immutable';

import {
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION
} from '../../constants/ActionTypes';

const initialState = fromJS({});

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case SET_COLUMNS:
        return state.setIn([action.stateKey], {
            columns: action.columns
        });

    case SET_SORT_DIRECTION:
        return state.setIn([action.stateKey], {
            columns: action.columns
        });

    case RESIZE_COLUMNS:
        return state.set(action.stateKey,
            Object.assign({}, state.get('gridState'), {
                columns: action.columns
            })
        );

        // NOT USING IMMUTABLE
        // THIS ACTION IS FIRED AT SUCH A HIGH RATE, NEED TO OPTIMIZE
        // BY NOT USING IMMUTABLE STATE GETTER

        // return state.setIn([action.stateKey], {
        //     columns: action.columns
        // });

    default:

        return state;
    }
}