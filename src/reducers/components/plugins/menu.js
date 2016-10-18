import { fromJS } from 'immutable';

import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

import { generateLastUpdate } from './../../../util/lastUpdate';

import
    handleActions
from './../../../util/handleActions';

import {
    showMenu,
    hideMenu
} from './../../actionHelpers/plugins/menu';

const initialState = fromJS({ lastUpdate: generateLastUpdate() });

export default handleActions({
    [SHOW_MENU]: showMenu,
    [HIDE_MENU]: hideMenu
}, initialState);
