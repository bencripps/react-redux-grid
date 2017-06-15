import { OrderedMap } from 'immutable';

import {
    REMOVE_TOOLBAR
} from './../../../constants/ActionTypes';

import handleActions from './../../../util/handleActions';

import {
    removeToolbar
} from './../../actionHelpers/plugins/bulkaction';

const initialState = new OrderedMap();

export default handleActions({
    [REMOVE_TOOLBAR]: removeToolbar
}, initialState);
