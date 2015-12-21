import { fromJS } from 'immutable';

import {
    SET_LOADING_STATE
} from '../../../constants/ActionTypes';

const initialState = fromJS({
    loaderState: fromJS.Map
});

export default function loader(state = initialState, action) {

    switch (action.type) {

    case SET_LOADING_STATE:
        return state.set('loaderState', action.state);

    default:
        return state;
    }
}