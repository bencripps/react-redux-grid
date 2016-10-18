import { fromJS } from 'immutable';

import {
    SET_SELECTION,
    SELECT_ALL,
    DESELECT_ALL,
    SET_DATA,
    SELECT_ROW,
    DESELECT_ROW
} from '../../../constants/ActionTypes';

import {
    selectAll,
    deselectAll,
    removeSelections,
    selectRow,
    deselectRow,
    setSelection
} from './../../actionHelpers/plugins/selection';

import
    handleActions
from './../../../util/handleActions';

import { generateLastUpdate } from './../../../util/lastUpdate';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default handleActions({
    [SET_SELECTION]: setSelection,
    [SELECT_ALL]: selectAll,
    [DESELECT_ALL]: deselectAll,
    [SET_DATA]: removeSelections,
    [SELECT_ROW]: selectRow,
    [DESELECT_ROW]: deselectRow
}, initialState);
