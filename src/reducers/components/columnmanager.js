import { fromJS } from 'immutable';

import {
    RESIZE_COLUMN
} from '../../constants/ActionTypes';

const initialState = fromJS({
    columnStates: fromJS.Map
});

export default function columnManager(state = initialState, action) {
    switch (action.type) {

    case RESIZE_COLUMN:
        if (action.lastColumn) {
            return state.set('columnStates', Object.assign({}, state.get('columnStates'),
                {
                    [action.id]: {
                        width: action.width
                    },
                    [action.lastColumn.id]: {
                        width: action.lastColumn.width
                    }
                }
            ));
        }

        else {
            return state.set('columnStates', Object.assign({}, state.get('columnStates'),
                {
                    [action.id]: {
                        width: action.width
                    }
                }
            ));
        }

    default:
        return state;
    }
}