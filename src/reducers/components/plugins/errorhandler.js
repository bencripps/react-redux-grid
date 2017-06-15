import { OrderedMap } from 'immutable';

import {
    ERROR_OCCURRED,
    DISMISS_ERROR
} from '../../../constants/ActionTypes';

import {
    dismissError,
    errorOccurred
} from './../../actionHelpers/plugins/errorhandler';

import handleActions from './../../../util/handleActions';

const initialState = new OrderedMap();

export default handleActions({
    [ERROR_OCCURRED]: errorOccurred,
    [DISMISS_ERROR]: dismissError
}, initialState);
