import { fromJS } from 'immutable';

import {
    ERROR_OCCURRED,
    DISMISS_ERROR
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

import {
    dismissError,
    errorOccurred
} from './../../actionHelpers/plugins/errorhandler';

import
    handleActions
from './../../../util/handleActions';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default handleActions({
    [ERROR_OCCURRED]: errorOccurred,
    [DISMISS_ERROR]: dismissError
}, initialState);
