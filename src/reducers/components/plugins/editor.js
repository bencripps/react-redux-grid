import { OrderedMap } from 'immutable';

import {
    EDIT_ROW,
    DISMISS_EDITOR,
    ROW_VALUE_CHANGE,
    CANCEL_ROW,
    REMOVE_ROW,
    REPOSITION_EDITOR,
    SET_DATA
} from '../../../constants/ActionTypes';

import handleActions from './../../../util/handleActions';

import {
    editRow,
    removeEditorState,
    setData,
    repositionEditor,
    rowValueChange
} from './../../actionHelpers/plugins/editor';

const initialState = new OrderedMap();

export default handleActions({
    [EDIT_ROW]: editRow,
    [DISMISS_EDITOR]: removeEditorState,
    [CANCEL_ROW]: removeEditorState,
    [REMOVE_ROW]: removeEditorState,
    [SET_DATA]: setData,
    [REPOSITION_EDITOR]: repositionEditor,
    [ROW_VALUE_CHANGE]: rowValueChange
}, initialState);
