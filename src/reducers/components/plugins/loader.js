import { fromJS } from 'immutable';

import {
    SET_LOADING_STATE
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

import {
    setLoading
} from './../../actionHelpers/plugins/loader';

import
    handleActions
from './../../../util/handleActions';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default handleActions({
    [SET_LOADING_STATE]: setLoading
}, initialState);
