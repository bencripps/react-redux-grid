import { OrderedMap } from 'immutable';

import {
    PAGE_LOCAL,
    PAGE_REMOTE
} from '../../../constants/ActionTypes';

import handleActions from './../../../util/handleActions';

import {
    pageLocal,
    pageRemote
} from './../../actionHelpers/plugins/pager';

const initialState = new OrderedMap();

export default handleActions({
    [PAGE_LOCAL]: pageLocal,
    [PAGE_REMOTE]: pageRemote
}, initialState);
