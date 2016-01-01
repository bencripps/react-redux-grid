import { fromJS } from 'immutable';

import { SET_COLUMNS } from '../../constants/ActionTypes';

const initialState = fromJS({
    gridState: fromJS.Map
});

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case SET_COLUMNS: 

        return state.set('gridState', {
            columns: action.columns
        });

    default:

        return state;
    }
}