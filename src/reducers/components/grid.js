import { fromJS } from 'immutable';

import { SET_COLUMNS, RESIZE_COLUMNS, SET_SORT_DIRECTION } from '../../constants/ActionTypes';

const initialState = fromJS({
    gridState: fromJS.Map
});

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case SET_COLUMNS:
        return state.set('gridState', {
            columns: action.columns
        });

    case SET_SORT_DIRECTION:

        return state.set('gridState', Object.assign({}, state.get('gridState'),
            {
                columns: action.columns
            }
        ));

    case RESIZE_COLUMNS:

        return state.set('gridState', {
            columns: action.columns
        });

    default:

        return state;
    }
}