import { OrderedMap } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

import handleActions from './../../../util/handleActions';

import {
    showMenu,
    hideMenu
} from './../../actionHelpers/plugins/menu';

const initialState = new OrderedMap();

export default handleActions({
    [SHOW_MENU]: showMenu,
    [HIDE_MENU]: hideMenu
}, initialState);
