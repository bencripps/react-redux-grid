import { fromJS } from 'immutable';

import {
    PAGE_LOCAL,
    PAGE_REMOTE
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

import
    handleActions
from './../../../util/handleActions';

import {
    pageLocal,
    pageRemote
} from './../../actionHelpers/plugins/pager';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default handleActions({
    [PAGE_LOCAL]: pageLocal,
    [PAGE_REMOTE]: pageRemote
}, initialState);
