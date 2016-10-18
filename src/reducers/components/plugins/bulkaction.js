import { fromJS } from 'immutable';

import {
    REMOVE_TOOLBAR
} from './../../../constants/ActionTypes';

import
    handleActions
from './../../../util/handleActions';

import { generateLastUpdate } from './../../../util/lastUpdate';

import {
    removeToolbar
} from './../../actionHelpers/plugins/bulkaction';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default handleActions({
    [REMOVE_TOOLBAR]: removeToolbar
}, initialState);
