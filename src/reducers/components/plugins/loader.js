import { OrderedMap } from 'immutable';

import {
    SET_LOADING_STATE
} from '../../../constants/ActionTypes';

import {
    setLoading
} from './../../actionHelpers/plugins/loader';

import handleActions from './../../../util/handleActions';

const initialState = new OrderedMap();

export default handleActions({
    [SET_LOADING_STATE]: setLoading
}, initialState);
