import { fromJS } from 'immutable';
import { SET_DATA, SORT_DATA } from '../../constants/ActionTypes';

const initialState = fromJS({
    gridData: fromJS.Map
});

export default function dataSource(state = initialState, action) {
    switch (action.type) {

    case SET_DATA:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: action.data,
                total: action.total,
                currentRecords: action.currentRecords
            }
        ));

    case SORT_DATA:
        return state.set('gridData', Object.assign({}, state.get('gridData'),
            {
                data: action.data
            }
        ));

    default:

        return state;
    }
}