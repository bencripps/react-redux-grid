import { fromJS } from 'immutable';

const initialState = fromJS({
    pagerState: fromJS.Map
});

export default function pager(state = initialState, action) {
    switch (action.type) {

    default:
        return state;
    }
}