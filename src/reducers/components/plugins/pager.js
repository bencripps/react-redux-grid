import { fromJS } from 'immutable';

import {
    PAGE_LOCAL_NEXT,
    PAGE_LOCAL_LAST
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    pagerState: fromJS.Map
});

export default function pager(state = initialState, action) {

    switch (action.type) {

    case PAGE_LOCAL_LAST:
        return state.set('pagerState', Object.assign({}, state.get('pagerState'),
            {
                pageIndex: action.pageIndex
            }
        ));

    case PAGE_LOCAL_NEXT:
        return state.set('pagerState', Object.assign({}, state.get('pagerState'),
            {
                pageIndex: action.pageIndex
            }
        ));

    default:
        return state;
    }
}