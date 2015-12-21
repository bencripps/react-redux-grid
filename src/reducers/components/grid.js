import { fromJS } from 'immutable';

import { SET_CURRENT_RECORDS } from '../../constants/ActionTypes';

const initialState = fromJS({
    gridState: fromJS.Map
});

export default function gridState(state = initialState, action) {

    switch (action.type) {

    case SET_CURRENT_RECORDS:

        return state.set('gridState', Object.assign({}, state.get('gridState'),
            {
                currentRecords: action.records
            }
        ));

    default:

        return state;
    }
}