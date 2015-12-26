import {
    SHOW_MENU,
    HIDE_MENU
} from '../../../constants/ActionTypes';

export function showMenu(id) {
    return { type: SHOW_MENU, id };
}

export function hideMenu(id) {
    return { type: HIDE_MENU, id };
}