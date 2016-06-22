import { fromJS } from 'immutable';

import {
    PAGE_LOCAL,
    PAGE_REMOTE
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({
    lastUpdate: generateLastUpdate()
});

export default function pager(state = initialState, action) {

    switch (action.type) {

    case PAGE_LOCAL:
        return state.mergeIn([action.stateKey], {
            pageIndex: action.pageIndex,
            lastUpdate: generateLastUpdate()
        });

    case PAGE_REMOTE:
        return state.mergeIn([action.stateKey], {
            pageIndex: action.pageIndex,
            lastUpdate: generateLastUpdate()
        });

    default:
        return state;
    }
}