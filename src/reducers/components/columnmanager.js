import { fromJS } from 'immutable';

import { } from '../../constants/ActionTypes';

const initialState = fromJS({
    columnStates: fromJS.Map
});

export default function columnManager(state = initialState, action) {

    switch (action.type) {

    default:
        return state;
    }
}