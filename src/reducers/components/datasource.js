import { OrderedMap } from 'immutable';

import {
    ADD_NEW_ROW,
    CLEAR_FILTER_LOCAL,
    DISMISS_EDITOR,
    FILTER_DATA,
    MOVE_NODE,
    REMOVE_ROW,
    SAVE_ROW,
    SET_DATA,
    SET_TREE_NODE_VISIBILITY,
    SET_TREE_DATA_PARTIAL,
    SORT_DATA,
    UPDATE_ROW
} from '../../constants/ActionTypes';

import
    handleActions
from './../../util/handleActions';

import {
    setData,
    setPartialTreeData,
    dismissEditor,
    removeRow,
    updateRow,
    addNewRow,
    moveNode,
    setTreeNodeVisibility,
    saveRow,
    sortData,
    filterData,
    clearFilter
} from './../actionHelpers/datasource';

const initialState = new OrderedMap();

export default handleActions({
    [ADD_NEW_ROW]: addNewRow,
    [CLEAR_FILTER_LOCAL]: clearFilter,
    [DISMISS_EDITOR]: dismissEditor,
    [FILTER_DATA]: filterData,
    [MOVE_NODE]: moveNode,
    [REMOVE_ROW]: removeRow,
    [SAVE_ROW]: saveRow,
    [SET_DATA]: setData,
    [SET_TREE_NODE_VISIBILITY]: setTreeNodeVisibility,
    [SET_TREE_DATA_PARTIAL]: setPartialTreeData,
    [SORT_DATA]: sortData,
    [UPDATE_ROW]: updateRow
}, initialState);
