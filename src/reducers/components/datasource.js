import { fromJS } from 'immutable';
import { SET_DATA } from '../../constants/ActionTypes';

const initialState = fromJS({
    data: fromJS.List
});

export default function dataSource(state = initialState, action) {
    switch (action.type) {

    case SET_DATA:
        return state.set('data', action.data);

    default:

        return state;
    }
}