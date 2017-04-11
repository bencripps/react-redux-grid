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
    UPDATE_ROW,
    INSERT_ROW
} from '../../constants/ActionTypes';

import
    handleActions
from './../../util/handleActions';

import {
    addNewRow,
    clearFilter,
    dismissEditor,
    filterData,
    insertRow,
    moveNode,
    removeRow,
    saveRow,
    setData,
    setPartialTreeData,
    setTreeNodeVisibility,
    sortData,
    updateRow
} from './../actionHelpers/datasource';

const initialState = new OrderedMap();

export default handleActions({
    [ADD_NEW_ROW]: addNewRow,
    [CLEAR_FILTER_LOCAL]: clearFilter,
    [DISMISS_EDITOR]: dismissEditor,
    [FILTER_DATA]: filterData,
    [INSERT_ROW]: insertRow,
    [MOVE_NODE]: moveNode,
    [REMOVE_ROW]: removeRow,
    [SAVE_ROW]: saveRow,
    [SET_DATA]: setData,
    [SET_TREE_NODE_VISIBILITY]: setTreeNodeVisibility,
    [SET_TREE_DATA_PARTIAL]: setPartialTreeData,
    [SORT_DATA]: sortData,
    [UPDATE_ROW]: updateRow
}, initialState);
