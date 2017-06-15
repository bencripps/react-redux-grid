import { OrderedMap } from 'immutable';

import {
    SET_COLUMNS,
    RESIZE_COLUMNS,
    SET_SORT_DIRECTION,
    HIDE_HEADER
} from './../../constants/ActionTypes';

import handleActions from './../../util/handleActions';

import {
    hideHeader,
    setColumns,
    setSortDirection,
    resizeColumns
} from './../actionHelpers/grid';

const initialState = new OrderedMap();

export default handleActions({
    [SET_COLUMNS]: setColumns,
    [RESIZE_COLUMNS]: resizeColumns,
    [SET_SORT_DIRECTION]: setSortDirection,
    [HIDE_HEADER]: hideHeader
}, initialState);
