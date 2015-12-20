import { fromJS } from 'immutable';

import {
    PAGE_LOCAL,
    PAGE_REMOTE
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    pagerState: fromJS.Map
});

export default function pager(state = initialState, action) {

    switch (action.type) {

    case PAGE_LOCAL:
        return state.set('pagerState', Object.assign({}, state.get('pagerState'),
            {
                pageIndex: action.pageIndex
            }
        ));

    case PAGE_REMOTE:
        return state.set('pagerState', Object.assign({}, state.get('pagerState'),
            {
                pageIndex: action.pageIndex
            }
        ));

    default:
        return state;
    }
}